import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(root, 'data', 'content.js');
const updatesPath = path.join(root, 'data', 'updates.js');
const code = fs.readFileSync(dataPath, 'utf8');
const updatesCode = fs.readFileSync(updatesPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
vm.runInContext(updatesCode, sandbox);
const data = sandbox.window.PORTFOLIO_DATA;
if (!data) throw new Error('PORTFOLIO_DATA was not found after loading data/content.js and data/updates.js');

const siteUrl = data.profile.siteUrl.endsWith('/') ? data.profile.siteUrl : `${data.profile.siteUrl}/`;
const social = `${siteUrl}assets/social-preview.jpg`;
const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const plain = (value = '') => String(value).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const desc = (value, max = 165) => {
  const t = plain(value);
  return t.length <= max ? t : `${t.slice(0, max - 1).trim()}…`;
};

function headMeta({ title, description, canonical, image = social, type = 'website' }) {
  return `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0c2942" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Karanveer Singh Engineering Portfolio" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />`;
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: data.profile.name,
  url: siteUrl,
  affiliation: { '@type': 'CollegeOrUniversity', name: data.profile.organisation },
  sameAs: data.profile.links.map(link => link.href),
  knowsAbout: data.skills.flatMap(group => [group.title, group.description].filter(Boolean))
};

const homeTitle = `${data.profile.name} | Electrical & Electronic Engineering Portfolio`;
const homeDescription = desc(data.profile.summary);
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headMeta({ title: homeTitle, description: homeDescription, canonical: siteUrl })}
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="manifest.webmanifest" />
  <link rel="stylesheet" href="assets/styles.css" />
  <script type="application/ld+json">${JSON.stringify(personLd)}</script>
</head>
<body>
  <a class="skip-link" href="#app">Skip to main content</a>
  <div class="page-shell">
    <header class="site-header" id="top"></header>
    <main id="app" tabindex="-1"></main>
    <footer class="site-footer" id="footer"></footer>
  </div>
  <script src="data/content.js"></script>
  <script src="data/updates.js"></script>
  <script src="data/recent-projects.js"></script>
  <script src="data/cv-link.js"></script>
  <script src="assets/app.js"></script>
</body>
</html>\n`;
fs.writeFileSync(path.join(root, 'index.html'), indexHtml);

const projectsRoot = path.join(root, 'projects');
fs.rmSync(projectsRoot, { recursive: true, force: true });
fs.mkdirSync(projectsRoot, { recursive: true });

for (const project of data.projects) {
  const dir = path.join(projectsRoot, project.id);
  fs.mkdirSync(dir, { recursive: true });
  const canonical = `${siteUrl}projects/${project.id}/`;
  const title = `${project.title} | ${data.profile.name}`;
  const description = desc(project.summary);
  const image = project.coverImage ? `${siteUrl}${project.coverImage}` : social;
  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: canonical,
    creator: { '@type': 'Person', name: data.profile.name, url: siteUrl },
    keywords: project.skills.join(', '),
    image
  };
  const html = `<!DOCTYPE html>
<html lang="en">
<head>${headMeta({ title, description, canonical, image, type: 'article' })}
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="../../manifest.webmanifest" />
  <link rel="stylesheet" href="../../assets/styles.css" />
  <script type="application/ld+json">${JSON.stringify(projectLd)}</script>
</head>
<body>
  <a class="skip-link" href="#project-app">Skip to main content</a>
  <div class="page-shell">
    <header class="site-header" id="top"></header>
    <main id="project-app" tabindex="-1"></main>
    <footer class="site-footer" id="footer"></footer>
  </div>
  <script>window.PROJECT_ID=${JSON.stringify(project.id)};window.SITE_BASE="../../";</script>
  <script src="../../data/content.js"></script>
  <script src="../../data/updates.js"></script>
  <script src="../../data/recent-projects.js"></script>
  <script src="../../assets/project.js"></script>
</body>
</html>\n`;
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const legacy = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Project redirect</title><link rel="stylesheet" href="assets/styles.css"></head><body><main class="container" style="padding:4rem 0"><div class="empty-state deco-frame"><h1 class="project-title">Redirecting…</h1><p class="project-subcopy">This project URL has moved to a cleaner permanent address.</p><a class="btn btn-primary" href="index.html#projects">Project index</a></div></main><script>const id=new URLSearchParams(location.search).get('id');if(id){location.replace('projects/'+encodeURIComponent(id)+'/');}</script></body></html>`;
fs.writeFileSync(path.join(root, 'project.html'), legacy);

const fourOhFour = `<!DOCTYPE html><html lang="en"><head>${headMeta({title:`Page not found | ${data.profile.name}`,description:'The requested portfolio page could not be found.',canonical:`${siteUrl}404.html`})}<meta name="robots" content="noindex"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/styles.css"></head><body><a class="skip-link" href="#main">Skip to main content</a><main id="main" class="container" style="padding:7rem 0"><div class="empty-state deco-frame"><div class="section-eyebrow">404</div><h1 class="project-title">Page not found.</h1><p class="project-subcopy">The link may be outdated, but the engineering portfolio is still here.</p><a class="btn btn-primary" href="index.html#projects">Return to projects</a></div></main></body></html>`;
fs.writeFileSync(path.join(root, '404.html'), fourOhFour);

const urls = [siteUrl, ...data.projects.map(p => `${siteUrl}projects/${p.id}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`);
fs.writeFileSync(path.join(root, '.nojekyll'), '');

// Validate local assets referenced by the data model.
const missing = [];
for (const file of [data.profile.cv, data.profile.portrait.src, ...data.profile.heroImages.map(i => i.src), ...data.projects.flatMap(p => [p.coverImage, ...p.gallery.map(g => g.src)]).filter(Boolean), ...data.archiveGroups.flatMap(g => g.images.map(i => i.src))]) {
  if (!file) continue;
  if (!fs.existsSync(path.join(root, file))) missing.push(file);
}
if (missing.length) {
  console.error('Missing local files:');
  for (const file of [...new Set(missing)]) console.error(` - ${file}`);
  process.exitCode = 1;
} else {
  console.log(`Build complete: ${data.projects.length} project pages, sitemap, robots.txt and metadata generated.`);
}
