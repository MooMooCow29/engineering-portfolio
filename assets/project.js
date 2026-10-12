const data = window.PORTFOLIO_DATA;
const siteBase = window.SITE_BASE || "../../";

const $ = (selector, root = document) => root.querySelector(selector);

function assetPath(path) {
  return path ? siteBase + path : "";
}

function cvLink(label = "CV", className = "") {
  if (!data.profile.cv) return "";
  return '<a class="' + className + '" href="' + assetPath(data.profile.cv) + '" target="_blank" rel="noreferrer">' + label + '</a>';
}

function getProject() {
  const id = window.PROJECT_ID || new URLSearchParams(window.location.search).get("id");
  return data.projects.find(project => project.id === id);
}

function renderHeader() {
  const header = $("#top");
  header.innerHTML = [
    '<div class="nav-wrap">',
      '<a class="brand-v2" href="' + siteBase + 'index.html" aria-label="Karanveer Singh portfolio home">',
        '<span class="brand-v2-name">' + data.profile.name + '</span>',
        '<span class="brand-v2-role">Electrical &amp; Electronic Engineering</span>',
      '</a>',
      '<nav class="nav-v2" aria-label="Project navigation">',
        '<a href="' + siteBase + 'index.html#work">Work</a>',
        '<a href="' + siteBase + 'index.html#experience">Experience</a>',
        '<a href="' + siteBase + 'index.html#writing">Writing</a>',
        '<a href="' + siteBase + 'index.html#about">About</a>',
        cvLink("CV"),
      '</nav>',
    '</div>'
  ].join('');
}

function renderFooter() {
  $("#footer").innerHTML = [
    '<div class="container footer-v2">',
      '<span>© ' + new Date().getFullYear() + ' ' + data.profile.name + '</span>',
      '<span>Project case study · evidence-led engineering portfolio</span>',
      '<a href="' + siteBase + 'index.html#work">All work ↑</a>',
    '</div>'
  ].join('');
}

function renderExternalLinks(project) {
  if (!project.links || !project.links.length) return "";
  return [
    '<div class="project-links-v2">',
      project.links.map(link => '<a href="' + link.href + '" target="_blank" rel="noreferrer">' + link.label + ' ↗</a>').join(''),
    '</div>'
  ].join('');
}

function renderFacts(project) {
  if (!project.facts || !project.facts.length) return "";
  return [
    '<section class="case-block-v2 case-facts-v2">',
      '<div class="case-heading-v2"><span>00</span><h2>At a glance</h2></div>',
      '<dl class="facts-v2">',
        project.facts.map(item => '<div><dt>' + item.label + '</dt><dd>' + item.value + '</dd></div>').join(''),
      '</dl>',
    '</section>'
  ].join('');
}

function renderCaseSections(project) {
  if (project.caseStudySections && project.caseStudySections.length) {
    return project.caseStudySections.map((section, index) => [
      '<section class="case-block-v2">',
        '<div class="case-heading-v2"><span>' + String(index + 1).padStart(2, "0") + '</span><h2>' + section.title + '</h2></div>',
        '<div class="case-copy-v2">',
          '<p>' + section.intro + '</p>',
          section.bullets && section.bullets.length
            ? '<ul>' + section.bullets.map(item => '<li>' + item + '</li>').join('') + '</ul>'
            : '',
          section.note
            ? '<aside class="boundary-v2"><strong>Engineering boundary</strong><p>' + section.note + '</p></aside>'
            : '',
        '</div>',
      '</section>'
    ].join('')).join('');
  }

  const sections = [
    ["01", "Challenge", project.challenge],
    ["02", "Approach", project.approach],
    ["03", "Testing & validation", project.testing],
    ["04", "Outcome", project.impact]
  ];

  return sections.filter(item => item[2]).map(item => [
    '<section class="case-block-v2">',
      '<div class="case-heading-v2"><span>' + item[0] + '</span><h2>' + item[1] + '</h2></div>',
      '<div class="case-copy-v2"><p>' + item[2] + '</p></div>',
    '</section>'
  ].join('')).join('');
}

function renderVerification(project) {
  if (!project.verification || !project.verification.length) return "";
  return [
    '<section class="case-block-v2">',
      '<div class="case-heading-v2"><span>VR</span><h2>Verification snapshot</h2></div>',
      '<div class="verification-v2">',
        project.verification.map(row => [
          '<div class="verification-row-v2">',
            '<span>' + row.metric + '</span>',
            '<strong>' + row.result + '</strong>',
            '<p>' + row.note + '</p>',
          '</div>'
        ].join('')).join(''),
      '</div>',
    '</section>'
  ].join('');
}

function renderNextSteps(project) {
  if (!project.nextSteps || !project.nextSteps.length) return "";
  return [
    '<section class="case-block-v2">',
      '<div class="case-heading-v2"><span>NX</span><h2>Next engineering gates</h2></div>',
      '<div class="case-copy-v2"><ul>',
        project.nextSteps.map(item => '<li>' + item + '</li>').join(''),
      '</ul></div>',
    '</section>'
  ].join('');
}

function renderGallery(project) {
  if (!project.gallery || !project.gallery.length) return "";
  return [
    '<section class="gallery-v2">',
      '<div class="case-heading-v2 gallery-heading-v2"><span>EV</span><h2>Evidence gallery</h2></div>',
      '<div class="gallery-grid-v2">',
        project.gallery.map((image, index) => [
          '<figure class="gallery-item-v2 ' + (index === 0 ? 'gallery-item-wide' : '') + '">',
            '<img src="' + assetPath(image.src) + '" alt="' + image.caption + '" loading="lazy">',
            '<figcaption><span>' + String(index + 1).padStart(2, "0") + '</span>' + image.caption + '</figcaption>',
          '</figure>'
        ].join('')).join(''),
      '</div>',
    '</section>'
  ].join('');
}

function renderRelated(project) {
  const related = data.projects
    .filter(item => item.id !== project.id)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3);

  return [
    '<section class="related-v2">',
      '<div class="section-heading-v2 compact-heading-v2">',
        '<div><p class="eyebrow-v2">Keep exploring</p><h2>Related work.</h2></div>',
      '</div>',
      '<div class="related-list-v2">',
        related.map((item, index) => [
          '<a href="../' + item.id + '/">',
            '<span>0' + (index + 1) + '</span>',
            '<strong>' + item.title + '</strong>',
            '<em>' + item.category + '</em>',
            '<b aria-hidden="true">↗</b>',
          '</a>'
        ].join('')).join(''),
      '</div>',
    '</section>'
  ].join('');
}

function renderNotFound() {
  $("#project-app").innerHTML = [
    '<section class="project-v2"><div class="container">',
      '<p class="eyebrow-v2">Project not found</p>',
      '<h1 class="project-title-v2">This case study is unavailable.</h1>',
      '<a class="text-link-v2 text-link-strong" href="' + siteBase + 'index.html#projects">Return to project index ↗</a>',
    '</div></section>'
  ].join('');
}

function renderPage() {
  renderHeader();
  renderFooter();

  const project = getProject();
  if (!project) return renderNotFound();

  document.title = project.title + ' | ' + data.profile.name;

  const cover = project.coverImage
    ? [
      '<figure class="project-hero-media-v2">',
        '<img src="' + assetPath(project.coverImage) + '" alt="' + project.title + '" style="object-position:' + (project.coverPosition || '50% 50%') + ';object-fit:' + (project.coverFit || 'cover') + '">',
      '</figure>'
    ].join('')
    : '';

  $("#project-app").innerHTML = [
    '<article class="project-v2">',
      '<header class="project-intro-v2">',
        '<div class="container">',
          '<a class="back-v2" href="' + siteBase + 'index.html#projects">← All projects</a>',
          '<div class="project-kicker-v2"><span>' + project.category + '</span><span>' + project.year + '</span><span>' + project.status + '</span></div>',
          '<div class="project-intro-grid-v2">',
            '<div>',
              '<h1 class="project-title-v2">' + project.title + '</h1>',
              '<p class="project-subtitle-v2">' + project.subtitle + '</p>',
            '</div>',
            '<div class="project-intro-copy-v2">',
              '<p>' + project.summary + '</p>',
              '<div class="project-skills-v2">' + project.skills.map(skill => '<span>' + skill + '</span>').join('') + '</div>',
              renderExternalLinks(project),
            '</div>',
          '</div>',
        '</div>',
      '</header>',
      cover,
      '<div class="container case-layout-v2">',
        '<aside class="case-sidebar-v2">',
          '<p class="sidebar-label-v2">Project record</p>',
          '<div><span>Category</span><strong>' + project.category + '</strong></div>',
          '<div><span>Year</span><strong>' + project.year + '</strong></div>',
          '<div><span>Status</span><strong>' + project.status + '</strong></div>',
          project.contribution ? '<div class="sidebar-contribution-v2"><span>My contribution</span><p>' + project.contribution + '</p></div>' : '',
        '</aside>',
        '<main class="case-content-v2">',
          renderFacts(project),
          renderCaseSections(project),
          renderVerification(project),
          renderNextSteps(project),
        '</main>',
      '</div>',
      '<div class="container">',
        renderGallery(project),
        renderRelated(project),
      '</div>',
    '</article>'
  ].join('');

  const updateHeader = () => $("#top").classList.toggle("is-scrolled", window.scrollY > 12);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

renderPage();
