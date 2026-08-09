# Karanveer Singh | Engineering Portfolio

Production-ready static portfolio for jobs, placements, research and technical collaboration.

## Public deployment target

The project is preconfigured for this GitHub Pages project URL:

`https://moomoocow29.github.io/engineering-portfolio/`

If you use a different repository name or a custom domain, change `profile.siteUrl` in `data/content.js`, then run:

```bash
node build.mjs
```

That regenerates the homepage metadata, clean project pages, sitemap, robots file and 404 page.

## Public profile links already added

- LinkedIn: `https://www.linkedin.com/in/karan-singh-6901a7246/`
- GitHub: `https://github.com/MooMooCow29`
- Medium: `https://medium.com/@ks683557`
- Public CV: `assets/Karanveer_Singh_Public_CV.pdf`

The public CV intentionally omits phone number and personal email. Employers can contact you through LinkedIn.

## What is production-ready

- Full-name branding and verified public profile links
- Public two-page CV PDF
- Employer-facing experience section including MBDA, Formula Student, UEA Innovators and Cranfield
- Clean project URLs under `/projects/<project-id>/`
- Unique HTML title, description and social metadata for every project
- Open Graph and large-card social preview metadata
- Schema.org structured data for the profile and project case studies
- Favicon and web manifest
- `robots.txt`
- `sitemap.xml`
- Custom `404.html`
- `.nojekyll` for GitHub Pages
- Compressed WebP project photography
- Keyboard focus styling and reduced-motion support
- Legacy `project.html?id=...` redirects to the clean URL

## Add a project

1. Open `data/content.js`.
2. Copy an existing object in the `projects` array.
3. Give it a unique lowercase ID, for example:

```js
id: "my-new-project"
```

4. Add images to `assets/images/` and reference them from the project object.
5. Run:

```bash
node build.mjs
```

The build script creates the new permanent URL automatically:

`/projects/my-new-project/`

It also adds the project to `sitemap.xml` and validates local image/CV references.

## Deploy

See `DEPLOY.md` for the exact GitHub Pages steps.

## Important public-sharing rule

Do not publish confidential, employer-owned, export-controlled, security-sensitive or team-restricted material. For restricted work, show your role, process and transferable skills without exposing protected technical detail.
