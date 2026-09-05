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
- EEG seizure-detection uncertainty-evaluation research prototype with automated tests and Monte Carlo evidence.

## Content model

The detailed project archive lives in `data/content.js`. Current factual/status corrections that must override older project snapshots live in `data/updates.js`. Recent externally validated work, newer research case studies, featured-project ordering and curated writing links live in `data/recent-projects.js`.

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

After changing any content layer:

```bash
node build.mjs
```

The build loads the layers in this order:

1. `data/content.js`
2. `data/updates.js`
3. `data/recent-projects.js`

It then regenerates permanent project pages, metadata, sitemap and robots files. Runtime pages load the same layers in the same order so displayed project status remains consistent with future rebuilds.

## GitHub Pages

Publish the repository from the `main` branch and `/(root)` in GitHub Pages settings.
