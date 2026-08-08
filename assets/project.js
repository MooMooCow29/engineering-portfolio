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
  if (!path) return "";
  return `${siteBase}${path}`;
}

function renderHeader() {
  const header = document.getElementById("top");
  const wrap = el("div", "nav-wrap");
  wrap.innerHTML = `
    <a class="brand" href="${siteBase}index.html" aria-label="Return to portfolio home">
      <div class="brand-mark">${data.profile.initials}</div>
      <div class="brand-text">
        <strong>${data.profile.name}</strong>
        <span>Engineering portfolio</span>
      </div>
    </a>
    <nav class="nav-links" aria-label="Project navigation">
      <a href="${siteBase}index.html#projects">Projects</a>
      <a href="${siteBase}index.html#experience">Experience</a>
      <a href="${siteBase}index.html#contact">Contact</a>
      <a href="${assetPath(data.profile.cv)}" target="_blank" rel="noreferrer">CV</a>
    </nav>
  `;
  header.appendChild(wrap);
}

function renderFooter() {
  const footer = document.getElementById("footer");
  const wrap = el("div", "footer-wrap");
  wrap.innerHTML = `
    <div class="footer-brand">
      <strong>${data.profile.name}</strong>
      <span>${data.profile.role} · ${data.profile.organisation}</span>
    </div>
    <div class="footer-meta">Industrial technical-editorial case study</div>
  `;
  footer.appendChild(wrap);
}

function getProject() {
  if (window.PROJECT_ID) {
    return data.projects.find(project => project.id === window.PROJECT_ID);
  }
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return data.projects.find(project => project.id === id);
}

function renderProjectCard(project) {
  return `
    <article class="project-card ${projectAccentClass(project)}">
      <a href="../${project.id}/" aria-label="Open ${project.title}">
        <div class="project-cover">
          ${project.coverImage ? `<img src="${assetPath(project.coverImage)}" alt="${project.title}" loading="lazy" />` : ""}
        </div>
      </a>
      <div class="project-body">
        <div class="meta-row">
          <span class="meta-pill">${project.year}</span>
          <span class="status-pill">${project.status}</span>
        </div>
        <h3><a href="../${project.id}/">${project.title}</a></h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <p>${project.summary}</p>
      </div>
    </article>
  `;
}

function renderNotFound() {
  document.getElementById("project-app").innerHTML = `
    <section class="project-page">
      <div class="container">
        <div class="empty-state deco-frame">
          <div class="section-eyebrow">Project not found</div>
          <h1 class="project-title">This case study is unavailable.</h1>
          <p class="project-subcopy">The link may be outdated. Return to the project index to continue browsing.</p>
          <a class="btn btn-primary" href="${siteBase}index.html#projects">View all projects</a>
        </div>
      </div>
    </section>`;
}

function renderPage() {
  renderHeader();
  renderFooter();

  const project = getProject();
  if (!project) {
    renderNotFound();
    return;
  }

  document.title = `${project.title} | ${data.profile.name}`;
  const app = document.getElementById("project-app");
  const related = data.projects.filter(item => item.id !== project.id).slice(0, 3);

  app.innerHTML = `
    <section class="project-page">
      <div class="container">
        <a class="back-link" href="${siteBase}index.html#projects">← Back to project index</a>
        <div class="project-banner deco-frame ${projectAccentClass(project)}">
          <div class="project-hero">
            <div>
              <div class="meta-row">
                <span class="meta-pill">${project.year}</span>
                <span class="status-pill">${project.status}</span>
              </div>
              <h1 class="project-title">${project.title}</h1>
              <p class="project-subtitle" style="font-size:1.05rem; margin-top:0.4rem;">${project.subtitle}</p>
              <p class="project-subcopy">${project.summary}</p>
              <div class="tag-row">
                ${project.skills.map(skill => `<span class="tag">${skill}</span>`).join("")}
              </div>
            </div>
            <div class="project-cover-large">
              ${project.coverImage ? `<img src="${assetPath(project.coverImage)}" alt="${project.title}" />` : `<div class="technical-placeholder"><span>PROJECT / SYSTEM</span></div>`}
            </div>
          </div>
        </div>

        <div class="project-detail-grid">
          <div class="project-content">
            <section class="project-section">
              <h2>Challenge</h2>
              <p>${project.challenge}</p>
            </section>
            <section class="project-section">
              <h2>Approach</h2>
              <p>${project.approach}</p>
            </section>
            <section class="project-section">
              <h2>Key decisions</h2>
              <ul class="bullet-list">${project.decisions.map(item => `<li>${item}</li>`).join("")}</ul>
            </section>
            <section class="project-section">
              <h2>Testing & validation</h2>
              <p>${project.testing}</p>
            </section>
            <section class="project-section">
              <h2>Impact</h2>
              <p>${project.impact}</p>
            </section>
            <section class="project-section">
              <h2>Next steps</h2>
              <ul class="bullet-list">${project.nextSteps.map(item => `<li>${item}</li>`).join("")}</ul>
            </section>
            ${project.gallery.length ? `
              <section class="project-section">
                <h2>Evidence gallery</h2>
                <div class="gallery-grid">
                  ${project.gallery.map(image => `
                    <figure class="image-card">
                      <img src="${assetPath(image.src)}" alt="${image.caption}" loading="lazy" />
                      <figcaption class="image-caption">${image.caption}</figcaption>
                    </figure>`).join("")}
                </div>
              </section>` : ""}
          </div>
          <aside class="project-sidebar deco-frame">
            <h2>Case study summary</h2>
            <p>This page is structured as an engineering note: problem, reasoning, validation and supporting evidence.</p>
            <div class="meta-row" style="margin:1rem 0;">
              <span class="meta-pill">${project.year}</span>
              <span class="meta-pill">${project.status}</span>
            </div>
            <h2>Core skills</h2>
            <div class="tag-row">${project.skills.map(skill => `<span class="tag">${skill}</span>`).join("")}</div>
            <h2 style="margin-top:1.2rem;">Why this matters</h2>
            <p>${project.impact}</p>
            <div class="project-actions" style="margin-top:1rem;">
              <a class="btn btn-primary" href="${siteBase}index.html#archive">Visual archive</a>
              <a class="btn btn-secondary" href="${assetPath(data.profile.cv)}" target="_blank" rel="noreferrer">Public CV</a>
            </div>
          </aside>
        </div>

        <section class="related-projects">
          <div class="section-head">
            <div>
              <div class="section-eyebrow">Related work</div>
              <h2 class="section-title">Other projects in the portfolio</h2>
            </div>
            <p class="section-copy">Continue through the portfolio to see the same design, testing and communication approach in other engineering contexts.</p>
          </div>
          <div class="projects-grid">${related.map(renderProjectCard).join("")}</div>
        </section>
      </div>
    </section>`;
}

renderPage();
