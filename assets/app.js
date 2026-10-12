const data = window.PORTFOLIO_DATA;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function cvLink(label = "CV", className = "") {
  if (!data.profile.cv) return "";
  return '<a class="' + className + '" href="' + data.profile.cv + '" target="_blank" rel="noreferrer">' + label + '</a>';
}

function projectUrl(project) {
  return 'projects/' + project.id + '/';
}

function renderHeader() {
  const header = $('#top');
  header.innerHTML = [
    '<div class="nav-wrap">',
      '<a class="brand-v2" href="#top" aria-label="Karanveer Singh portfolio home">',
        '<span class="brand-v2-name">' + data.profile.name + '</span>',
        '<span class="brand-v2-role">Electrical &amp; Electronic Engineering</span>',
      '</a>',
      '<nav class="nav-v2" aria-label="Primary navigation">',
        '<a href="#work">Work</a>',
        '<a href="#experience">Experience</a>',
        '<a href="#writing">Writing</a>',
        '<a href="#about">About</a>',
        cvLink('CV'),
      '</nav>',
    '</div>'
  ].join('');
}

function renderHero() {
  const image = data.profile.heroImages && data.profile.heroImages[0];
  return [
    '<section class="hero-v2">',
      '<div class="container hero-v2-grid">',
        '<div class="hero-v2-copy">',
          '<p class="eyebrow-v2">Electrical · Embedded · Control · Research</p>',
          '<h1>' + data.profile.name + '</h1>',
          '<h2>' + data.profile.tagline + '</h2>',
          '<p class="hero-v2-lede">' + data.profile.summary + '</p>',
          '<div class="hero-v2-actions">',
            '<a class="text-link-v2 text-link-strong" href="#work">Selected work <span aria-hidden="true">↘</span></a>',
            '<a class="text-link-v2" href="#about">About</a>',
            cvLink('CV', 'text-link-v2'),
          '</div>',
          '<div class="social-row-v2">',
            data.profile.links.map(link => '<a href="' + link.href + '" target="_blank" rel="noreferrer">' + link.label + '</a>').join(''),
          '</div>',
        '</div>',
        image ? [
          '<a class="hero-v2-media" href="' + (image.href || '#work') + '">',
            '<img src="' + image.src + '" alt="' + image.alt + '" loading="eager">',
            '<div class="media-caption-v2"><span>Current focus</span><strong>' + image.caption + '</strong></div>',
          '</a>'
        ].join('') : '',
      '</div>',
      '<div class="container hero-v2-proof">',
        data.profile.highlights.map((item, i) => '<div><span>0' + (i + 1) + '</span><p>' + item + '</p></div>').join(''),
      '</div>',
    '</section>'
  ].join('');
}

function renderFeatureProject(project, index) {
  const image = project.coverImage
    ? '<a class="feature-media-v2" href="' + projectUrl(project) + '"><img src="' + project.coverImage + '" alt="' + project.title + '" loading="lazy" style="object-position:' + (project.coverPosition || '50% 50%') + ';object-fit:' + (project.coverFit || 'cover') + '"></a>'
    : '';

  return [
    '<article class="feature-project-v2 ' + (index % 2 ? 'feature-project-reverse' : '') + '">',
      image,
      '<div class="feature-copy-v2">',
        '<div class="project-meta-v2">',
          '<span>' + String(index + 1).padStart(2, '0') + '</span>',
          '<span>' + project.category + '</span>',
          '<span>' + project.year + '</span>',
        '</div>',
        '<h3><a href="' + projectUrl(project) + '">' + project.title + '</a></h3>',
        '<p class="feature-subtitle-v2">' + project.subtitle + '</p>',
        '<p>' + project.summary + '</p>',
        '<div class="feature-tags-v2">' + project.skills.slice(0, 5).map(skill => '<span>' + skill + '</span>').join('') + '</div>',
        '<a class="text-link-v2 text-link-strong" href="' + projectUrl(project) + '">View case study <span aria-hidden="true">↗</span></a>',
      '</div>',
    '</article>'
  ].join('');
}

function renderWork() {
  const featured = data.projects.filter(project => project.featured && project.coverImage).slice(0, 6);
  const all = data.projects;
  const categories = ['All', ...new Set(all.map(project => project.category))];

  return [
    '<section id="work" class="section-v2 section-work-v2">',
      '<div class="container">',
        '<div class="section-heading-v2">',
          '<div><p class="eyebrow-v2">Selected engineering work</p><h2>Built, tested, revised.</h2></div>',
          '<p>Flagship projects are shown as engineering stories rather than identical cards. Open a case study for architecture, decisions, validation evidence, limitations and relevant links.</p>',
        '</div>',
        '<div class="feature-list-v2">',
          featured.map(renderFeatureProject).join(''),
        '</div>',
      '</div>',
    '</section>',
    '<section id="projects" class="section-v2 project-index-v2">',
      '<div class="container">',
        '<div class="section-heading-v2 compact-heading-v2">',
          '<div><p class="eyebrow-v2">Project index</p><h2>More than fits on a CV.</h2></div>',
          '<p>Smaller prototypes, research directions and software work live here without competing visually with the flagship case studies.</p>',
        '</div>',
        '<div class="filter-row-v2" role="group" aria-label="Filter project index">',
          categories.map((category, index) => '<button type="button" class="filter-v2 ' + (index === 0 ? 'is-active' : '') + '" data-filter="' + category.toLowerCase() + '">' + category + '</button>').join(''),
        '</div>',
        '<div class="project-table-v2">',
          all.map((project, index) => [
            '<a class="project-row-v2" href="' + projectUrl(project) + '" data-category="' + project.category.toLowerCase() + '">',
              '<span class="project-row-number">' + String(index + 1).padStart(2, '0') + '</span>',
              '<span class="project-row-title">' + project.title + '</span>',
              '<span class="project-row-category">' + project.category + '</span>',
              '<span class="project-row-year">' + project.year + '</span>',
              '<span class="project-row-arrow" aria-hidden="true">↗</span>',
            '</a>'
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderCapabilities() {
  const projectMap = new Map(data.projects.map(project => [project.id, project]));
  return [
    '<section id="skills" class="section-v2 capability-v2">',
      '<div class="container">',
        '<div class="section-heading-v2 compact-heading-v2">',
          '<div><p class="eyebrow-v2">What I work with</p><h2>Capability backed by evidence.</h2></div>',
          '<p>No percentages or decorative skill meters. Each area links directly to project work that demonstrates it.</p>',
        '</div>',
        '<div class="capability-list-v2">',
          data.skills.map((group, index) => [
            '<article class="capability-row-v2">',
              '<span class="capability-number-v2">0' + (index + 1) + '</span>',
              '<h3>' + group.title + '</h3>',
              '<p>' + group.description + '</p>',
              '<div class="capability-projects-v2">',
                group.projectIds.map(id => projectMap.get(id)).filter(Boolean).slice(0, 4).map(project => '<a href="' + projectUrl(project) + '">' + project.title + '</a>').join(''),
              '</div>',
            '</article>'
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderExperience() {
  return [
    '<section id="experience" class="section-v2">',
      '<div class="container">',
        '<div class="section-heading-v2 compact-heading-v2">',
          '<div><p class="eyebrow-v2">Experience</p><h2>Industry, leadership, technical context.</h2></div>',
          '<p>The projects do the technical proving; these roles explain where the engineering judgement, collaboration and delivery context came from.</p>',
        '</div>',
        '<div class="timeline-v2">',
          data.experience.map((item, index) => [
            '<article class="timeline-row-v2">',
              '<div class="timeline-period-v2">' + item.period + '</div>',
              '<div class="timeline-title-v2"><span>0' + (index + 1) + '</span><h3>' + item.title + '</h3><strong>' + item.organisation + '</strong></div>',
              '<p>' + item.summary + '</p>',
            '</article>'
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderWriting() {
  return [
    '<section id="writing" class="section-v2 writing-v2">',
      '<div class="container">',
        '<div class="section-heading-v2 compact-heading-v2">',
          '<div><p class="eyebrow-v2">Writing about the process</p><h2>Engineering, explained in public.</h2></div>',
          '<p>Technical articles, engineering documentation and open-source contributions sit alongside the project evidence.</p>',
        '</div>',
        '<div class="writing-list-v2">',
          data.writing.map((item, index) => [
            '<a class="writing-row-v2" href="' + item.href + '" target="_blank" rel="noreferrer">',
              '<span class="writing-number-v2">' + String(index + 1).padStart(2, '0') + '</span>',
              '<span class="writing-category-v2">' + item.category + '</span>',
              '<span class="writing-title-v2">' + item.title + '</span>',
              '<span class="writing-arrow-v2" aria-hidden="true">↗</span>',
            '</a>'
          ].join('')).join(''),
        '</div>',
        '<div class="writing-more-v2"><a class="text-link-v2 text-link-strong" href="https://medium.com/@ks683557" target="_blank" rel="noreferrer">View Medium profile <span aria-hidden="true">↗</span></a></div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderAbout() {
  return [
    '<section id="about" class="section-v2 about-v2">',
      '<div class="container about-v2-grid">',
        '<div class="about-v2-copy">',
          '<p class="eyebrow-v2">Outside the schematic</p>',
          '<h2>Engineer first. Curious about the whole system.</h2>',
          '<p>' + data.profile.summary + '</p>',
          '<p>I am most interested in problems where physical systems, electronics and software interact: embedded systems, robotics, control, power electronics, sensing, verification and research-led engineering.</p>',
          '<p>The portfolio is intentionally broader than a CV. I use it to show the decisions, measurements, failed routes and evidence behind the finished line on a résumé.</p>',
          '<div class="about-links-v2">',
            data.profile.links.map(link => '<a class="text-link-v2" href="' + link.href + '" target="_blank" rel="noreferrer">' + link.label + ' ↗</a>').join(''),
            cvLink('CV ↗', 'text-link-v2'),
          '</div>',
        '</div>',
        '<figure class="portrait-v2">',
          '<img src="' + data.profile.portrait.src + '" alt="' + data.profile.portrait.alt + '" loading="lazy">',
        '</figure>',
      '</div>',
    '</section>'
  ].join('');
}

function renderContact() {
  return [
    '<section id="contact" class="contact-v2">',
      '<div class="container contact-v2-inner">',
        '<p class="eyebrow-v2">Research · placements · jobs · collaboration</p>',
        '<h2>Have an engineering problem worth discussing?</h2>',
        '<div class="contact-links-v2">',
          '<a href="https://www.linkedin.com/in/karan-singh-6901a7246/" target="_blank" rel="noreferrer">LinkedIn ↗</a>',
          '<a href="https://github.com/MooMooCow29" target="_blank" rel="noreferrer">GitHub ↗</a>',
          '<a href="https://medium.com/@ks683557" target="_blank" rel="noreferrer">Medium ↗</a>',
          cvLink('CV ↗'),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderFooter() {
  const footer = $('#footer');
  footer.innerHTML = [
    '<div class="container footer-v2">',
      '<span>© ' + new Date().getFullYear() + ' ' + data.profile.name + '</span>',
      '<span>Electrical &amp; Electronic Engineering · ' + data.profile.organisation + '</span>',
      '<a href="#top">Back to top ↑</a>',
    '</div>'
  ].join('');
}

function setupFilters() {
  $$('.filter-v2').forEach(button => {
    button.addEventListener('click', () => {
      $$('.filter-v2').forEach(item => item.classList.remove('is-active'));
      button.classList.add('is-active');
      const filter = button.dataset.filter;
      $$('.project-row-v2').forEach(row => {
        row.hidden = filter !== 'all' && row.dataset.category !== filter;
      });
    });
  });
}

function setupHeaderState() {
  const header = $('#top');
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function render() {
  renderHeader();
  $('#app').innerHTML = [
    renderHero(),
    renderWork(),
    renderCapabilities(),
    renderExperience(),
    renderWriting(),
    renderAbout(),
    renderContact()
  ].join('');
  renderFooter();
  setupFilters();
  setupHeaderState();
}

render();
