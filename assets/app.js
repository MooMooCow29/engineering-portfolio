const data = window.PORTFOLIO_DATA;

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

function cvLink(label = "CV", className = "") {
  if (!data.profile.cv) return "";
  return `<a class="${className}" href="${data.profile.cv}" target="_blank" rel="noreferrer">${label}</a>`;
}

function renderHeader() {
  const header = document.getElementById("top");
  const wrap = el("div", "nav-wrap");
  wrap.innerHTML = `
    <a class="brand" href="#top" aria-label="Portfolio home">
      <div class="brand-mark">${data.profile.initials}</div>
      <div class="brand-text">
        <strong>${data.profile.name}</strong>
        <span>Engineering portfolio</span>
      </div>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      ${data.navigation.map(item => `<a href="${item.href}">${item.label}</a>`).join("")}
      ${cvLink("CV")}
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
    <div class="footer-meta">Engineering evidence, project case studies and technical writing</div>
  `;
  footer.appendChild(wrap);
}

function renderCover(project, context = "card") {
  if (project.coverImage) {
    const pos = project.coverPosition || "50% 50%";
    return `<img src="${project.coverImage}" alt="${project.title}" loading="lazy" style="object-position:${pos};object-fit:${project.coverFit || "cover"}" />`;
  }
  return `
    <div class="technical-cover ${context === "compact" ? "technical-cover-compact" : ""}">
      <span class="technical-cover-kicker">${project.category}</span>
      <strong>${project.coverLabel || project.title}</strong>
      <small>${project.coverDetail || project.subtitle}</small>
    </div>`;
}

function renderHero() {
  const hero = data.profile.heroImages[0];
  return `
    <section class="hero">
      <div class="container hero-grid hero-grid-clean">
        <div class="hero-copy deco-frame">
          <div class="kicker">Electrical & electronic engineering</div>
          <h1>${data.profile.tagline}</h1>
          <p class="lede">${data.profile.summary}</p>
          <p class="hero-subtext">${data.profile.statement}</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="${data.profile.ctaPrimary.href}">${data.profile.ctaPrimary.label}</a>
            <a class="btn btn-secondary" href="${data.profile.ctaSecondary.href}">${data.profile.ctaSecondary.label}</a>
          </div>
          <div class="link-row">
            ${data.profile.links.map(link => `<a class="link-pill" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
          </div>
          <div class="hero-proof-list">
            ${data.profile.highlights.map(item => `<div class="hero-proof-item">${item}</div>`).join("")}
          </div>
        </div>
        <a class="hero-feature" href="${hero.href || '#projects'}" aria-label="Open featured project">
          <img src="${hero.src}" alt="${hero.alt}" loading="eager" />
          <div class="hero-feature-caption">
            <span>Featured evidence</span>
            <strong>${hero.caption || 'Open case study'}</strong>
          </div>
        </a>
      </div>
    </section>
  `;
}

function renderMetrics() {
  return `
    <section class="metrics-section">
      <div class="container metrics-grid">
        ${data.metrics.map(metric => `
          <article class="metric deco-frame">
            <strong>${metric.value}</strong>
            <span>${metric.label}</span>
          </article>`).join("")}
      </div>
    </section>
  `;
}

function renderProjectCard(project) {
  return `
    <article class="project-card ${projectAccentClass(project)}" data-project-category="${project.category}">
      <a href="projects/${project.id}/" aria-label="Open ${project.title}">
        <div class="project-cover">${renderCover(project)}</div>
      </a>
      <div class="project-body">
        <div class="meta-row">
          <span class="meta-pill">${project.year}</span>
          <span class="status-pill">${project.status}</span>
        </div>
        <h3><a href="projects/${project.id}/">${project.title}</a></h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <p>${project.summary}</p>
        <div class="tag-row">
          ${project.skills.slice(0, 4).map(skill => `<span class="tag">${skill}</span>`).join("")}
        </div>
        <div class="project-actions" style="margin-top:1rem;">
          <a class="btn btn-secondary" href="projects/${project.id}/">Read case study</a>
        </div>
      </div>
    </article>`;
}

function renderCompactProject(project) {
  return `
    <article class="directory-card" data-directory-card data-category="${project.category.toLowerCase()}">
      <div class="directory-cover">${renderCover(project, "compact")}</div>
      <div class="directory-body">
        <div class="meta-row">
          <span class="directory-category">${project.category}</span>
          <span class="meta-pill">${project.status}</span>
        </div>
        <h3><a href="projects/${project.id}/">${project.title}</a></h3>
        <p>${project.summary}</p>
        <div class="tag-row">${project.skills.slice(0,3).map(skill => `<span class="tag">${skill}</span>`).join("")}</div>
      </div>
    </article>`;
}

function renderProjects() {
  const featured = data.projects.filter(project => project.featured);
  const categories = ["All", ...new Set(data.projects.map(project => project.category))];
  return `
    <section id="projects">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Featured projects</div>
            <h2 class="section-title">Engineering case studies</h2>
          </div>
          <p class="section-copy">Featured work is selected for employer relevance and evidence quality. Images are now project-specific: if no relevant public image exists, the card uses a technical label rather than borrowing an unrelated photograph.</p>
        </div>
        <div class="projects-grid featured-project-grid">
          ${featured.map(renderProjectCard).join("")}
        </div>
      </div>
    </section>

    <section id="project-directory" class="project-directory-section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Complete project index</div>
            <h2 class="section-title">More than fits on a CV</h2>
          </div>
          <p class="section-copy">Use the filters to browse hardware, control, software, research and leadership work without forcing every project into the featured grid.</p>
        </div>
        <div class="project-filter-bar" role="group" aria-label="Filter projects by category">
          ${categories.map((category, index) => `<button class="project-filter ${index===0 ? "is-active" : ""}" type="button" data-project-filter="${category.toLowerCase()}">${category}</button>`).join("")}
        </div>
        <div class="project-directory-grid">
          ${data.projects.map(renderCompactProject).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSkills() {
  const projectMap = new Map(data.projects.map(project => [project.id, project]));
  return `
    <section id="skills">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Capabilities</div>
            <h2 class="section-title">Capabilities linked to evidence</h2>
          </div>
          <p class="section-copy">No arbitrary percentages and no decorative “skill” symbols. Each capability links directly to work that demonstrates it.</p>
        </div>
        <div class="skills-grid evidence-skills-grid">
          ${data.skills.map(group => `
            <article class="skill-group evidence-skill-card">
              <div class="cap-code">${group.code}</div>
              <h3>${group.title}</h3>
              <p>${group.description}</p>
              <div class="evidence-links">
                <span>Evidence</span>
                ${group.projectIds.map(id => projectMap.get(id)).filter(Boolean).map(project => `<a href="projects/${project.id}/">${project.title}</a>`).join("")}
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProcess() {
  const steps = [
    ["01", "Requirements", "Define the problem, interfaces, constraints and what would count as success."],
    ["02", "Architecture", "Compare alternatives and make assumptions visible before committing to implementation."],
    ["03", "Build", "Create hardware, software or models with clear boundaries and test access."],
    ["04", "Verify", "Measure behaviour against requirements, inject failures and record evidence."],
    ["05", "Iterate", "Use failed tests and observed limitations to drive the next revision."]
  ];
  return `
    <section>
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Engineering workflow</div>
            <h2 class="section-title">From requirements to evidence</h2>
          </div>
          <p class="section-copy">The strongest projects on the site make this chain explicit instead of presenting only a finished screenshot or final prototype.</p>
        </div>
        <div class="process-panel">
          <div class="process-grid">
            ${steps.map(([number, title, copy]) => `
              <article class="process-step">
                <div class="process-number">${number}</div>
                <strong>${title}</strong>
                <span>${copy}</span>
              </article>`).join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function renderExperience() {
  return `
    <section id="experience">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Experience</div>
            <h2 class="section-title">Industry, leadership and technical context</h2>
          </div>
          <p class="section-copy">These roles provide context for the project work: industry exposure, vehicle-level integration, society leadership and technical mentoring.</p>
        </div>
        <div class="experience-grid">
          ${data.experience.map(item => `
            <article class="experience-card deco-frame">
              <div class="meta-row"><span class="meta-pill">${item.period}</span></div>
              <h3>${item.title}</h3>
              <p><strong>${item.organisation}</strong></p>
              <p>${item.summary}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function renderWriting() {
  return `
    <section id="writing">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Technical writing</div>
            <h2 class="section-title">Engineering explained in public</h2>
          </div>
          <p class="section-copy">The expanded writing section now reflects the breadth of the Medium work: control, robotics, electronics, simulation, systems engineering and engineering philosophy.</p>
        </div>
        <div class="writing-grid expanded-writing-grid">
          ${data.writing.map(item => `
            <article class="write-card deco-frame">
              <span class="article-category">${item.category}</span>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <a class="write-link" href="${item.href}" target="_blank" rel="noreferrer">Read / find on Medium →</a>
            </article>`).join("")}
        </div>
        <div class="writing-footer-link">
          <a class="btn btn-secondary" href="https://medium.com/@ks683557" target="_blank" rel="noreferrer">View full Medium profile</a>
        </div>
      </div>
    </section>`;
}

function renderAbout() {
  return `
    <section id="about">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">About me</div>
            <h2 class="section-title">Hands-on engineering, explained clearly.</h2>
          </div>
          <p class="section-copy">The professional portrait stays in the About section; lab and project imagery is now used only where it actually supports the associated work.</p>
        </div>
        <div class="about-grid">
          <div class="about-card card deco-frame">
            <h3 class="section-title" style="font-size:2.7rem;">${data.profile.name}</h3>
            <p class="section-copy" style="margin-top:0.6rem;">${data.profile.role} · ${data.profile.organisation} · ${data.profile.location}</p>
            <p class="section-copy" style="margin-top:1rem;">${data.profile.summary}</p>
            <p class="section-copy" style="margin-top:1rem;">I am most interested in problems where physical systems, electronics and software interact: robotics, power electronics, control, sensing, verification and emerging neurotechnology/medtech applications.</p>
            <ul class="highlight-list">
              <li>Systems thinker: requirements, architecture, interfaces and trade-offs.</li>
              <li>Hands-on builder: breadboards, sensors, motors, PCBs and test equipment.</li>
              <li>Technical communicator: public writing, workshops, presentations and team leadership.</li>
            </ul>
            <div class="cta-row">
              ${cvLink("Download CV", "btn btn-primary")}
              ${data.profile.links.map(link => `<a class="btn btn-secondary" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
            </div>
          </div>
          <div class="about-photo">
            <img src="${data.profile.portrait.src}" alt="${data.profile.portrait.alt}" loading="lazy" />
          </div>
        </div>
      </div>
    </section>`;
}

function renderContact() {
  return `
    <section id="contact">
      <div class="container">
        <div class="contact-panel deco-frame">
          <div>
            <div class="section-eyebrow">Contact & verification</div>
            <h2 class="section-title">Continue the conversation.</h2>
            <p class="section-copy">The public site keeps direct personal contact details off the page. LinkedIn, GitHub and Medium provide public ways to verify the work and get in touch.</p>
          </div>
          <div class="contact-actions">
            <a class="btn btn-primary" href="https://www.linkedin.com/in/karan-singh-6901a7246/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a class="btn btn-secondary" href="https://github.com/MooMooCow29" target="_blank" rel="noreferrer">GitHub</a>
            <a class="btn btn-secondary" href="https://medium.com/@ks683557" target="_blank" rel="noreferrer">Medium</a>
            ${cvLink("CV", "btn btn-secondary")}
          </div>
        </div>
      </div>
    </section>`;
}

function renderArchive() {
  return `
    <section id="archive">
      <div class="container archive-layout">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Evidence archive</div>
            <h2 class="section-title">Project-specific visual evidence</h2>
          </div>
          <p class="section-copy">The archive now contains only evidence grouped by the project it actually belongs to. Generic identity photography is excluded from technical evidence.</p>
        </div>
        ${data.archiveGroups.map(group => `
          <section class="archive-group deco-frame">
            <h3>${group.title}</h3>
            <p>${group.description}</p>
            <div class="archive-grid">
              ${group.images.map(image => `
                <figure class="archive-photo">
                  <img src="${image.src}" alt="${image.caption}" loading="lazy" />
                  <figcaption class="image-caption">${image.caption}</figcaption>
                </figure>`).join("")}
            </div>
          </section>`).join("")}
      </div>
    </section>`;
}

function activateProjectFilters() {
  const buttons = [...document.querySelectorAll("[data-project-filter]")];
  const cards = [...document.querySelectorAll("[data-directory-card]")];
  if (!buttons.length) return;

  buttons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.projectFilter;
    buttons.forEach(item => item.classList.toggle("is-active", item === button));
    cards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
    });
  }));
}

function renderPage() {
  renderHeader();
  renderFooter();
  document.getElementById("app").innerHTML = [
    renderHero(),
    renderMetrics(),
    renderProjects(),
    renderSkills(),
    renderProcess(),
    renderExperience(),
    renderWriting(),
    renderAbout(),
    renderContact()
  ].join("");
  activateProjectFilters();
}

renderPage();
