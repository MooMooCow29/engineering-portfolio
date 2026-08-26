const data = window.PORTFOLIO_DATA;
const siteBase = window.SITE_BASE || "../../";

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function projectAccentClass(project) {
  if (project.accent === "orange") return "accent-orange";
  if (project.accent === "navy") return "accent-navy";
  return "accent-teal";
}

function assetPath(path) {
  return path ? `${siteBase}${path}` : "";
}

function cvLink(label = "CV", className = "") {
  if (!data.profile.cv) return "";
  return `<a class="${className}" href="${assetPath(data.profile.cv)}" target="_blank" rel="noreferrer">${label}</a>`;
}

function renderHeader() {
  const header = document.getElementById("top");
  const wrap = el("div", "nav-wrap");
  wrap.innerHTML = `
    <a class="brand" href="${siteBase}index.html" aria-label="Return to portfolio home">
      <div class="brand-mark">${data.profile.initials}</div>
      <div class="brand-text"><strong>${data.profile.name}</strong><span>Engineering portfolio</span></div>
    </a>
    <nav class="nav-links" aria-label="Project navigation">
      <a href="${siteBase}index.html#projects">Featured</a>
      <a href="${siteBase}index.html#project-directory">All projects</a>
      <a href="${siteBase}index.html#writing">Writing</a>
      <a href="${siteBase}index.html#contact">Contact</a>
      ${cvLink("CV")}
    </nav>`;
  header.appendChild(wrap);
}

function renderFooter() {
  const footer = document.getElementById("footer");
  const wrap = el("div", "footer-wrap");
  wrap.innerHTML = `
    <div class="footer-brand"><strong>${data.profile.name}</strong><span>${data.profile.role} · ${data.profile.organisation}</span></div>
    <div class="footer-meta">Project case study · evidence-led engineering portfolio</div>`;
  footer.appendChild(wrap);
}

function getProject() {
  if (window.PROJECT_ID) return data.projects.find(project => project.id === window.PROJECT_ID);
  const id = new URLSearchParams(window.location.search).get("id");
  return data.projects.find(project => project.id === id);
}

function renderCover(project) {
  if (project.coverImage) {
    const pos = project.coverPosition || "50% 50%";
    return `<img src="${assetPath(project.coverImage)}" alt="${project.title}" style="object-position:${pos};object-fit:${project.coverFit || "cover"}" />`;
  }
  return `<div class="technical-cover technical-cover-large"><span class="technical-cover-kicker">${project.category}</span><strong>${project.coverLabel || project.title}</strong><small>${project.coverDetail || project.subtitle}</small></div>`;
}

function renderProjectCard(project) {
  return `
    <article class="project-card ${projectAccentClass(project)}">
      <a href="../${project.id}/" aria-label="Open ${project.title}">
        <div class="project-cover">${project.coverImage ? `<img src="${assetPath(project.coverImage)}" alt="${project.title}" loading="lazy" style="object-position:${project.coverPosition || "50% 50%"};object-fit:${project.coverFit || "cover"}" />` : `<div class="technical-cover"><span class="technical-cover-kicker">${project.category}</span><strong>${project.coverLabel || project.title}</strong><small>${project.coverDetail || project.subtitle}</small></div>`}</div>
      </a>
      <div class="project-body">
        <div class="meta-row"><span class="meta-pill">${project.year}</span><span class="status-pill">${project.status}</span></div>
        <h3><a href="../${project.id}/">${project.title}</a></h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <p>${project.summary}</p>
      </div>
    </article>`;
}

function renderVerification(project) {
  if (!project.verification || !project.verification.length) return "";
  return `
    <section class="project-section">
      <h2>Verification snapshot</h2>
      <div class="verification-table-wrap">
        <table class="verification-table">
          <thead><tr><th>Evidence</th><th>Result</th><th>Boundary / note</th></tr></thead>
          <tbody>
            ${project.verification.map(row => `<tr><td>${row.metric}</td><td><strong>${row.result}</strong></td><td>${row.note}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>`;
}

function renderFacts(project) {
  if (!project.facts || !project.facts.length) return "";
  return `
    <section class="project-section project-facts-section">
      <div class="project-section-heading"><span class="section-index">00</span><h2>At a glance</h2></div>
      <dl class="project-facts-grid">
        ${project.facts.map(item => `<div class="project-fact"><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join("")}
      </dl>
    </section>`;
}

function renderCaseStudySections(project) {
  if (!project.caseStudySections || !project.caseStudySections.length) return "";
  return project.caseStudySections.map((section, index) => `
    <section class="project-section deep-case-section">
      <div class="project-section-heading"><span class="section-index">${String(index + 1).padStart(2, "0")}</span><h2>${section.title}</h2></div>
      <p>${section.intro}</p>
      ${section.bullets && section.bullets.length ? `<ul class="case-study-bullets">${section.bullets.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
      ${section.note ? `<div class="engineering-note"><strong>Engineering boundary</strong><span>${section.note}</span></div>` : ""}
    </section>`).join("");
}

function renderLegacyStudy(project) {
  return `
    <section class="project-section"><h2>Challenge</h2><p>${project.challenge}</p></section>
    <section class="project-section"><h2>Approach</h2><p>${project.approach}</p></section>
    <section class="project-section"><h2>Key decisions</h2><ul class="bullet-list">${project.decisions.map(item => `<li>${item}</li>`).join("")}</ul></section>
    <section class="project-section"><h2>Testing & validation</h2><p>${project.testing}</p></section>
    <section class="project-section"><h2>Outcome / why it matters</h2><p>${project.impact}</p></section>`;
}

function renderGallery(project) {
  if (!project.gallery || !project.gallery.length) return "";
  return `
    <section class="project-section project-gallery-section">
      <div class="project-section-heading"><span class="section-index">EV</span><h2>Evidence gallery</h2></div>
      <p class="gallery-intro">Only images that directly support this project are included here. Where no project-specific image exists, the case study stays text-led rather than borrowing unrelated photography.</p>
      <div class="gallery-grid">
        ${project.gallery.map(image => `<figure class="image-card"><img src="${assetPath(image.src)}" alt="${image.caption}" loading="lazy" /><figcaption class="image-caption">${image.caption}</figcaption></figure>`).join("")}
      </div>
    </section>`;
}

function renderExternalLinks(project) {
  if (!project.links || !project.links.length) return "";
  return `<div class="project-external-links">${project.links.map(link => `<a class="btn btn-secondary" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}</div>`;
}

function renderNotFound() {
  document.getElementById("project-app").innerHTML = `
    <section class="project-page"><div class="container"><div class="empty-state deco-frame">
      <div class="section-eyebrow">Project not found</div><h1 class="project-title">This case study is unavailable.</h1>
      <p class="project-subcopy">The link may be outdated. Return to the project index to continue browsing.</p>
      <a class="btn btn-primary" href="${siteBase}index.html#project-directory">View all projects</a>
    </div></div></section>`;
}

function renderPage() {
  renderHeader();
  renderFooter();
  const project = getProject();
  if (!project) return renderNotFound();

  document.title = `${project.title} | ${data.profile.name}`;
  const app = document.getElementById("project-app");
  const related = data.projects
    .filter(item => item.id !== project.id)
    .sort((a,b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0,3);

  app.innerHTML = `
    <section class="project-page">
      <div class="container">
        <a class="back-link" href="${siteBase}index.html#project-directory">← Back to project index</a>
        <div class="project-banner deco-frame ${projectAccentClass(project)}">
          <div class="project-hero">
            <div>
              <div class="meta-row"><span class="meta-pill">${project.year}</span><span class="status-pill">${project.status}</span><span class="meta-pill">${project.category}</span></div>
              <h1 class="project-title">${project.title}</h1>
              <p class="project-subtitle" style="font-size:1.05rem;margin-top:0.4rem;">${project.subtitle}</p>
              <p class="project-subcopy">${project.summary}</p>
              <div class="tag-row">${project.skills.map(skill => `<span class="tag">${skill}</span>`).join("")}</div>
              ${renderExternalLinks(project)}
            </div>
            <div class="project-cover-large">${renderCover(project)}</div>
          </div>
        </div>

        <div class="project-detail-grid">
          <div class="project-content">
            ${renderFacts(project)}
            ${project.contribution ? `<section class="project-section contribution-section"><div class="project-section-heading"><span class="section-index">ME</span><h2>My contribution</h2></div><p>${project.contribution}</p></section>` : ""}
            ${project.caseStudySections && project.caseStudySections.length ? renderCaseStudySections(project) : renderLegacyStudy(project)}
            ${renderVerification(project)}
            <section class="project-section next-steps-section"><div class="project-section-heading"><span class="section-index">NX</span><h2>Next engineering gates</h2></div><ul class="case-study-bullets">${project.nextSteps.map(item => `<li>${item}</li>`).join("")}</ul></section>
            ${renderGallery(project)}
          </div>

          <aside class="project-sidebar deco-frame">
            <div class="section-eyebrow">Project record</div>
            <h2>${project.category}</h2>
            <p>${project.summary}</p>
            <div class="meta-row" style="margin:1rem 0;"><span class="meta-pill">${project.year}</span><span class="meta-pill">${project.status}</span></div>
            <h2>Core skills</h2>
            <div class="tag-row">${project.skills.map(skill => `<span class="tag">${skill}</span>`).join("")}</div>
            ${project.links && project.links.length ? `<div class="sidebar-links"><h2>Relevant links</h2>${renderExternalLinks(project)}</div>` : ""}
            <div class="project-actions" style="margin-top:1rem;">
              <a class="btn btn-primary" href="${siteBase}index.html#project-directory">All projects</a>
              ${cvLink("CV", "btn btn-secondary")}
            </div>
          </aside>
        </div>

        <section class="related-projects">
          <div class="section-head"><div><div class="section-eyebrow">Related work</div><h2 class="section-title">Other projects</h2></div><p class="section-copy">More work from the same portfolio, prioritising similar technical areas where possible.</p></div>
          <div class="projects-grid">${related.map(renderProjectCard).join("")}</div>
        </section>
      </div>
    </section>`;
}

renderPage();
