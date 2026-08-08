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
      <a href="${data.profile.cv}" target="_blank" rel="noreferrer">CV</a>
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
    <div class="footer-meta">Industrial technical-editorial interface · real prototypes first</div>
  `;
  footer.appendChild(wrap);
}

function renderHero() {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy deco-frame">
          <div class="kicker">Electrical & electronic engineering</div>
          <h1>${data.profile.tagline}</h1>
          <p class="lede">${data.profile.summary}</p>
          <p class="hero-subtext">${data.profile.statement}</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="${data.profile.ctaPrimary.href}">${data.profile.ctaPrimary.label}</a>
            <a class="btn btn-secondary" href="${data.profile.cv}" target="_blank" rel="noreferrer">Download public CV</a>
            <a class="btn btn-secondary" href="${data.profile.ctaSecondary.href}">${data.profile.ctaSecondary.label}</a>
          </div>
          <div class="link-row">
            ${data.profile.links.map(link => `<a class="link-pill" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
          </div>
          <ul class="highlight-list">
            ${data.profile.highlights.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div class="hero-mosaic" aria-label="Selected project evidence">
          ${data.profile.heroImages.map(image => `
            <figure class="mosaic-card">
              <img src="${image.src}" alt="${image.alt}" loading="eager" />
            </figure>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderMetrics() {
  return `
    <section aria-label="Portfolio highlights">
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

function renderProjects() {
  return `
    <section id="projects">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Featured projects</div>
            <h2 class="section-title">Engineering case studies</h2>
          </div>
          <p class="section-copy">Projects are presented through the problem, technical approach, design decisions, testing and the evidence produced along the way.</p>
        </div>
        <div class="projects-grid">
          ${data.projects.map(project => `
            <article class="project-card ${projectAccentClass(project)}">
              <a href="projects/${project.id}/" aria-label="Open ${project.title}">
                <div class="project-cover">
                  ${project.coverImage ? `<img src="${project.coverImage}" alt="${project.title}" loading="lazy" />` : ""}
                </div>
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
            </article>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSkills() {
  return `
    <section id="skills">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">What I do</div>
            <h2 class="section-title">Capabilities linked to work</h2>
          </div>
          <p class="section-copy">The site avoids arbitrary skill percentages. Each capability is supported by projects, technical evidence or leadership experience.</p>
        </div>
        <div class="skills-grid">
          ${data.skills.map(group => `
            <article class="skill-group deco-frame">
              <h3>${group.title}</h3>
              <ul class="bullet-list">
                ${group.items.map(item => `<li>${item}</li>`).join("")}
              </ul>
            </article>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProcess() {
  const steps = [
    ["01", "Discover", "Define the problem, users and constraints."],
    ["02", "Design", "Model the system and compare architectures."],
    ["03", "Build", "Assemble hardware and integrate software."],
    ["04", "Test", "Measure performance and expose failure modes."],
    ["05", "Iterate", "Use evidence to improve the next revision."]
  ];

  return `
    <section>
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Engineering workflow</div>
            <h2 class="section-title">From concept to evidence</h2>
          </div>
          <p class="section-copy">The visual identity references technical drawings, but the process remains grounded in practical engineering work.</p>
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
    </section>
  `;
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
          <p class="section-copy">The design is intentionally more mature than the earlier illustrated concept: restrained colour, technical linework, real photography and a clearer employer-facing hierarchy.</p>
        </div>
        <div class="about-grid">
          <div class="about-card card deco-frame">
            <h3 class="section-title" style="font-size:2.7rem;">${data.profile.name}</h3>
            <p class="section-copy" style="margin-top:0.6rem;">${data.profile.role} · ${data.profile.organisation} · ${data.profile.location}</p>
            <p class="section-copy" style="margin-top:1rem;">${data.profile.summary}</p>
            <p class="section-copy" style="margin-top:1rem;">I am most interested in problems where physical systems, electronics and software interact: robotics, power electronics, control, sensing and emerging medtech-adjacent applications.</p>
            <ul class="highlight-list">
              <li>Systems thinker: architecture, interfaces and trade-offs.</li>
              <li>Hands-on builder: breadboards, sensors, motors and test equipment.</li>
              <li>Technical communicator: workshops, leadership and engineering writing.</li>
            </ul>
            <div class="cta-row">
              <a class="btn btn-primary" href="${data.profile.cv}" target="_blank" rel="noreferrer">Download public CV</a>
              ${data.profile.links.map(link => `<a class="btn btn-secondary" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
            </div>
          </div>
          <div class="about-photo">
            <img src="${data.profile.portrait.src}" alt="${data.profile.portrait.alt}" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderExperience() {
  return `
    <section id="experience">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Experience</div>
            <h2 class="section-title">Leadership and engineering context</h2>
          </div>
          <p class="section-copy">Evidence of working within teams, teaching others and taking responsibility for systems beyond individual coursework.</p>
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
    </section>
  `;
}

function renderWriting() {
  return `
    <section id="writing">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Writing</div>
            <h2 class="section-title">Technical thinking in public</h2>
          </div>
          <p class="section-copy">Writing demonstrates how I reason about engineering ideas and communicate them beyond a project report.</p>
        </div>
        <div class="writing-grid">
          ${data.writing.map(item => `
            <article class="write-card deco-frame">
              <h3>${item.title}</h3>
              <p>Engineering explanation and reflection published through my Medium portfolio.</p>
              <a class="write-link" href="${item.href}" target="_blank" rel="noreferrer">Visit Medium →</a>
            </article>`).join("")}
        </div>
      </div>
    </section>
  `;
}


function renderContact() {
  return `
    <section id="contact">
      <div class="container">
        <div class="contact-panel deco-frame">
          <div>
            <div class="section-eyebrow">Contact & verification</div>
            <h2 class="section-title">Continue the conversation.</h2>
            <p class="section-copy">For public sharing, this site intentionally omits my phone number and personal email. The links below provide employer-safe ways to verify my work or contact me.</p>
          </div>
          <div class="contact-actions">
            <a class="btn btn-primary" href="https://www.linkedin.com/in/karan-singh-6901a7246/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a class="btn btn-secondary" href="https://github.com/MooMooCow29" target="_blank" rel="noreferrer">GitHub</a>
            <a class="btn btn-secondary" href="https://medium.com/@ks683557" target="_blank" rel="noreferrer">Medium</a>
            <a class="btn btn-secondary" href="${data.profile.cv}" target="_blank" rel="noreferrer">Public CV</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderArchive() {
  return `
    <section id="archive">
      <div class="container archive-layout">
        <div class="section-head">
          <div>
            <div class="section-eyebrow">Visual archive</div>
            <h2 class="section-title">Prototype and measurement record</h2>
          </div>
          <p class="section-copy">All supplied images are retained and organised into meaningful engineering groups rather than being scattered decoratively across the site.</p>
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
    </section>
  `;
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
    renderAbout(),
    renderExperience(),
    renderWriting(),
    renderContact(),
    renderArchive()
  ].join("");
}

renderPage();
