const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'index (1).html'), 'utf8');

test('inline scripts parse as JavaScript', () => {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);
  assert.ok(scripts.length > 0, 'expected inline application scripts');
  for (const script of scripts) new vm.Script(script);
});

test('the UI describes a local keyword heuristic, not AI or ATS scoring', () => {
  assert.match(html, /Browser-only keyword demo/);
  assert.match(html, /Scores count shared keywords only/);
  assert.match(html, /not AI or ATS results, hiring predictions, or proof of role fit/);
  assert.match(html, /This local score counts shared keywords only/);
  assert.doesNotMatch(html, /AI-Powered Analysis|Apply with confidence|Excellent Match/);
});

test('resume uploads are bounded UTF-8 text files only', () => {
  assert.match(html, /accept="\.txt,text\/plain"/);
  assert.match(html, /const maxResumeBytes=1024\*1024/);
  assert.match(html, /file\.size>maxResumeBytes/);
  assert.match(html, /Only plain-text \.txt files are supported/);
  assert.match(html, /r\.readAsText\(file,'UTF-8'\)/);
  assert.doesNotMatch(html, /r\.readAsArrayBuffer\(file\)|accept="[^\"]*\.pdf/);
});

test('dynamic HTML text is escaped before rendering', () => {
  assert.match(html, /function escapeHtml\(value\)/);
  assert.match(html, /escapeHtml\(j\.title\)/);
  assert.match(html, /escapeHtml\(cat\.name\)/);
  assert.match(html, /escapeHtml\(s\)/);
  assert.match(html, /escapeHtml\(r\.title\)/);
  const source = html.match(/function escapeHtml\(value\)\{[^\r\n]+/)[0];
  const sandbox = {};
  vm.runInNewContext(source + ';this.escapeHtml=escapeHtml', sandbox);
  assert.equal(sandbox.escapeHtml('<img src=x onerror=1> & "x"'), '&lt;img src=x onerror=1&gt; &amp; &quot;x&quot;');
});
