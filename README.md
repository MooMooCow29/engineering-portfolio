# Karanveer Singh | Engineering Portfolio

Static GitHub Pages portfolio for electrical/electronic engineering, embedded systems, control, verification and research-led projects.

Public site: https://moomoocow29.github.io/engineering-portfolio/

## Current profile

The portfolio is maintained as an evidence-led engineering record rather than a project-count gallery. Current headline evidence includes:

- Third-year MEng Electrical & Electronic Engineering, University of East Anglia.
- 70.5% Year 2 average (First-class level).
- MBDA Electronics Engineering internship completed in 2026; graduate offer received following the placement.
- Electrical Systems Lead, Formula Student UEA.
- Vice-President, UEA Innovators.
- IAEA Global Virtual Student Challenge finalist.
- PCBWay-sponsored controller PCB with manufacturing release complete and physical bring-up next.
- MEng dissertation: energy-harvesting circuit to power electronic-paper badges.
- Merged upstream contribution to `upb-lea/pySignalScope`.

## Content model

The detailed project archive lives in `data/content.js`. Current factual/status corrections that must override older project snapshots live in `data/updates.js`, with small recent external-achievement updates in `data/recent-projects.js`.

Each project can contain:

- `facts` — concise engineering metadata shown at the top of the case study.
- `caseStudySections` — project-specific technical sections with optional bullet evidence and claim-boundary notes.
- `verification` — measured/test evidence displayed in a structured table.
- `gallery` — only project-specific images; unrelated imagery should not be used as filler.
- `links` — repositories, documentation, pull requests, technical articles or institutional evidence.

Projects without relevant imagery deliberately use a technical placeholder until real evidence is available.

## Claim discipline

A project should distinguish clearly between:

- implemented / measured evidence;
- calculated or cited assumptions;
- design/manufacturing release;
- planned physical validation;
- future research direction.

Do not convert a planned test into a completed claim merely to make the portfolio look stronger.

## Build

After changing the content model or current override layer:

```bash
node build.mjs
```

The build loads `data/content.js` and then applies `data/updates.js` before regenerating permanent project pages, metadata, sitemap and robots files. Runtime pages also load the current update layers so displayed project status remains consistent.

## GitHub Pages

Publish the repository from the `main` branch and `/(root)` in GitHub Pages settings.
