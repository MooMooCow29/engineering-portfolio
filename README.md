# Karanveer Singh — Immersive Engineering Portfolio

This branch is a clean rebuild based directly on Henry Heffernan's MIT-licensed portfolio source:

- Original repository: https://github.com/henryjeff/portfolio-website
- Original author: Henry Heffernan
- Original licence: MIT, reproduced at `THIRD_PARTY_LICENSES/HENRY_HEFFERNAN_MIT.md`

The previous experimental homepage code is **not** the basis of this branch. The immersive shell, loading sequence, camera architecture, baked 3D room, CSS3D monitor system, shaders and interaction model come from Henry's source. Changes are limited to what is required to turn it into Karanveer Singh's engineering portfolio and to preserve the existing engineering case studies.

## What is changed

- Henry Heffernan identity → Karanveer Singh.
- Software-engineering copy → Electrical & Electronic Engineering.
- HeffernanOS iframe → local `KaranOS` engineering workstation.
- Monitor projects → Karanveer's engineering projects, experience and writing.
- Metadata, social links and favicon → Karanveer's portfolio.
- Existing detailed case-study pages are copied into the production build so monitor links remain useful.
- Henry's runtime scene assets are downloaded from the original MIT-licensed repository by `scripts/fetch-henry-assets.mjs`.

## What is deliberately kept

The goal of this branch is *not* to redesign Henry's experience. The following are intentionally kept close to the original source:

- loading / BIOS sequence;
- baked room and computer models;
- camera keyframes and cinematic transitions;
- free-camera behaviour;
- CSS3D monitor architecture;
- monitor surface texture treatment;
- coffee-steam and screen shaders;
- UI motion and interaction rhythm;
- keyboard/mouse/ambient audio behaviour.

## Local preview

Use Node.js 20+.

```bash
npm install
npm run dev
```

The first run downloads the original scene assets that are required at runtime.

For a production build:

```bash
npm run build
```

Webpack writes the site to `public/`.

## Engineering content

The existing evidence-led project archive remains in:

- `projects/`
- `data/`
- `assets/`
- `cv/`

Webpack copies those directories into `public/` after building the immersive shell.

## Branch

Development branch: `henry-base-rebuild`.

Do not merge this branch to `main` until the immersive rebuild has been visually reviewed.
