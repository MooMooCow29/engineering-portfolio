# Karanveer Singh | Engineering Portfolio

Static GitHub Pages portfolio for electrical, electronic, embedded, control and research projects.

## Content model

Edit `data/content.js` to add or update projects. Each project can contain:

- `facts` — concise engineering metadata shown at the top of the case study.
- `caseStudySections` — project-specific technical sections with optional bullet evidence and claim-boundary notes.
- `verification` — measured/test evidence displayed in a structured table.
- `gallery` — only project-specific images; unrelated imagery should not be used as filler.
- `links` — repositories, documentation, pull requests, technical articles or institutional evidence.

Projects without relevant imagery deliberately use a technical placeholder until real evidence is available.

## Build

After editing the content model:

```bash
node build.mjs
```

This regenerates the permanent project pages, metadata, sitemap and robots file.

## GitHub Pages

Publish the repository from the `main` branch and `/(root)` in GitHub Pages settings.
