# AI Resume + Job Matcher

<p align="center"><strong>A single-page, browser-only prototype that compares resume text with a sample job description and highlights matching skill keywords.</strong></p>

<p align="center">HTML · CSS · JavaScript · Local heuristic analysis</p>

## Project overview

Paste resume text or select a text-based file, choose one of ten bundled sample jobs, or paste a custom job description. The page calculates a keyword-overlap score, groups matched and missing terms into skill categories, and displays a results breakdown.

## Architecture

```mermaid
flowchart LR
  U[User] --> P[Single-page HTML interface]
  P --> T[Resume text and job description]
  T --> H[In-browser keyword matching]
  H --> R[Score, matched skills, missing skills]
  R --> P
```

No server, AI model, database, or external resume parser is included. Sample jobs and scoring keywords are bundled in the page. Results are illustrative and should not be treated as hiring decisions or a validated ATS score.

## Run locally

Open [`index (1).html`](index%20%281%29.html) in a modern browser. No install or build step is required. For a local web server, serve the repository directory with any static-file server.

## Use it

1. Paste resume text, or try a text-based file and review the extracted text.
2. Select a sample role or paste a job description.
3. Choose **Analyze Match** and review the score and skill categories.
4. Edit the inputs to compare a different role.

PDF/DOCX parsing is not implemented; the upload logic reads text and should not be relied on to extract formatted documents accurately. The browser performs the analysis locally in the page.

## Project structure

- `index (1).html` — page markup, styles, sample jobs, and matching logic
- `LICENSE` — repository license
