const data = window.PORTFOLIO_DATA;

const $ = (selector, root = document) => root.querySelector(selector);

function cvLink(label = "CV", className = "") {
  if (!data.profile.cv) return "";
  return '<a class="' + className + '" href="' + data.profile.cv + '" target="_blank" rel="noreferrer" data-cursor="OPEN">' + label + '</a>';
}

function projectUrl(project) {
  return 'projects/' + project.id + '/';
}

function renderHeader() {
  $('#top').innerHTML = [
    '<div class="ak-nav shell">',
      '<a class="ak-logo" href="#hero" aria-label="Karanveer Singh portfolio home">',
        '<span class="ak-logo-mark">KS</span>',
        '<span class="ak-logo-copy"><strong>Karanveer Singh</strong><small>Electrical &amp; Electronic Engineering</small></span>',
      '</a>',
      '<nav class="ak-nav-links" aria-label="Primary navigation">',
        '<a href="#about">About</a>',
        '<a href="#skills">Capabilities</a>',
        '<a href="#work">Work</a>',
        '<a href="#writing">Writing</a>',
        '<a href="#contact">Contact</a>',
        cvLink('CV'),
      '</nav>',
      '<button class="ak-theme" type="button" aria-label="Toggle colour theme" data-theme-toggle>',
        '<span aria-hidden="true">◐</span>',
      '</button>',
    '</div>'
  ].join('');
}


function renderLabIntro() {
  const hotspots = [
    ['scope', 'OSCILLOSCOPE', 'pySignalScope', 'projects/pysignalscope/'],
    ['pcb', 'CONTROLLER PCB', 'Advanced 2WD Robot Controller', 'projects/advanced-2wd-robot-controller/'],
    ['robot', 'ROBOT PLATFORM', 'Obstacle Avoidance Robot', 'projects/obstacle-avoidance-robot/'],
    ['epaper', 'E-PAPER', 'Batteryless ePaper Research', 'projects/energy-harvesting-epaper/'],
    ['aurora', 'AVIONICS CONSOLE', 'AURORA-VX', 'projects/aurora-vx/'],
    ['formula', 'VEHICLE ELECTRONICS', 'Formula Student Electrical Systems', 'projects/formula-student-electrical/']
  ];
  return [
    '<section id="lab" class="lab-intro" aria-label="Interactive engineering workbench">',
      '<canvas class="lab-canvas" id="lab-canvas" aria-hidden="true"></canvas>',
      '<div class="lab-fallback" aria-hidden="true"></div>',
      '<div class="lab-vignette" aria-hidden="true"></div>',
      '<div class="lab-scanlines" aria-hidden="true"></div>',
      '<div class="lab-overlay shell">',
        '<div class="lab-brand">',
          '<span class="lab-brand-mark">KS</span>',
          '<div><strong>KARANVEER SINGH</strong><small>INTERACTIVE ENGINEERING PORTFOLIO</small></div>',
        '</div>',
        '<a class="lab-skip mono" href="#hero">SKIP EXPERIENCE ↓</a>',
        '<div class="lab-status">',
          '<span class="lab-status-dot"></span>',
          '<span class="mono">WORKBENCH ONLINE / 2026</span>',
        '</div>',
        '<div class="lab-entry" data-lab-entry>',
          '<span class="lab-index mono">ELECTRICAL · EMBEDDED · CONTROL · VERIFICATION</span>',
          '<h1>ENTER THE<br><em>WORKBENCH.</em></h1>',
          '<p>A navigable engineering desk built from the work in this portfolio. Inspect the instruments, focus individual systems and open the evidence behind each project.</p>',
          '<div class="lab-entry-actions">',
            '<button class="ak-btn ak-btn-solid magnetic" type="button" data-lab-enter><span>Enter experience ↘</span></button>',
            '<a class="ak-btn ak-btn-ghost magnetic" href="#hero"><span>Use standard portfolio</span></a>',
          '</div>',
          '<div class="lab-entry-meta mono"><span>WEBGL / THREE.JS</span><span>6 INTERACTIVE SYSTEMS</span><span>ESC TO RETURN</span></div>',
        '</div>',
        '<div class="lab-explore-ui" data-lab-explore hidden>',
          '<div class="lab-instruction">',
            '<span class="mono">DRAG TO LOOK · SCROLL TO ZOOM · CLICK TO INSPECT</span>',
            '<strong>ENGINEERING WORKBENCH</strong>',
          '</div>',
          '<div class="lab-reticle" aria-hidden="true"><span></span><span></span><i></i></div>',
          '<div class="lab-hotspot-list" aria-label="Workbench project shortcuts">',
            '<button class="lab-monitor-launch" type="button" data-lab-monitor>',
              '<span>00</span>',
              '<div><small>MAIN MONITOR</small><strong>KaranOS Engineering Terminal</strong></div>',
              '<b>ENTER</b>',
            '</button>',
            hotspots.map((item, index) => [
              '<a href="' + item[3] + '" data-lab-hotspot="' + item[0] + '" data-lab-number="' + (index + 1) + '">',
                '<span>' + String(index + 1).padStart(2, '0') + '</span>',
                '<div><small>' + item[1] + '</small><strong>' + item[2] + '</strong></div>',
                '<b>FOCUS</b>',
              '</a>'
            ].join('')).join(''),
          '</div>',
          '<div class="lab-telemetry mono" aria-hidden="true">',
            '<span>CAM <b data-lab-cam>OVERVIEW</b></span>',
            '<span>FPS <b data-lab-fps>--</b></span>',
            '<span>MODE <b data-lab-mode>EXPLORE</b></span>',
          '</div>',
          '<a class="lab-continue" href="#hero"><span>Continue to full portfolio</span><b>↓</b></a>',
        '</div>',
        '<button class="lab-monitor-back mono" type="button" data-lab-monitor-back hidden>← RETURN TO WORKBENCH</button>',
        '<aside class="lab-project-panel" data-lab-project hidden aria-live="polite">',
          '<button type="button" class="lab-project-close" data-lab-close aria-label="Return to workbench">×</button>',
          '<span class="lab-project-eyebrow mono" data-lab-project-type>PROJECT</span>',
          '<div class="lab-project-counter mono"><span data-lab-project-number>01</span> / 06</div>',
          '<h2 data-lab-project-title>Project</h2>',
          '<p class="lab-project-subtitle" data-lab-project-subtitle></p>',
          '<p class="lab-project-summary" data-lab-project-summary></p>',
          '<div class="lab-project-tags" data-lab-project-tags></div>',
          '<div class="lab-project-evidence">',
            '<span class="mono">ENGINEERING SIGNAL</span>',
            '<strong data-lab-project-signal></strong>',
          '</div>',
          '<div class="lab-project-actions">',
            '<a class="ak-btn ak-btn-solid" data-lab-project-link href="#"><span>Open case study ↗</span></a>',
            '<button class="ak-btn ak-btn-ghost" type="button" data-lab-back><span>Back to workbench</span></button>',
          '</div>',
          '<small class="lab-project-hint mono">PRESS ESC TO RETURN</small>',
        '</aside>',
        '<div class="lab-hover-label" data-lab-label hidden>',
          '<span data-lab-label-type></span>',
          '<strong data-lab-label-title></strong>',
          '<small>CLICK TO INSPECT</small>',
        '</div>',
        '<div class="lab-loader" data-lab-loader>',
          '<div class="lab-loader-line"><span data-lab-progress></span></div>',
          '<div><span class="mono" data-lab-loader-label>INITIALISING WORKBENCH</span><b class="mono" data-lab-progress-number>00%</b></div>',
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderFieldControls() {
  const items = [
    ['sense', 'SENSE', 'Sensors, acquisition, estimation and measurement evidence.'],
    ['control', 'CONTROL', 'Feedback, embedded logic and autonomous behaviour.'],
    ['power', 'POWER', 'Power architecture, energy conversion and hardware boundaries.'],
    ['verify', 'VERIFY', 'Requirements, testing, fault injection and traceability.']
  ];
  return [
    '<div class="field-controls reveal" aria-label="Interactive engineering field controls">',
      '<div class="field-controls-core">',
        '<span class="mono">LIVE ENGINEERING FIELD</span>',
        '<strong>PHYSICAL → DIGITAL → VERIFIED</strong>',
      '</div>',
      items.map((item, index) => [
        '<button type="button" class="field-control field-control-' + item[0] + '" data-field-focus="' + item[0] + '" data-detail="' + item[2] + '">',
          '<span>0' + (index + 1) + '</span><strong>' + item[1] + '</strong>',
        '</button>'
      ].join('')).join(''),
      '<p class="field-control-detail" data-field-detail aria-live="polite">Move through the system. The field responds to the engineering domain you select.</p>',
    '</div>'
  ].join('');
}

function renderHero() {
  return [
    '<section id="hero" class="ak-hero" data-field-mode="system">',
      '<div class="hero-atmos" aria-hidden="true"><span></span><span></span><span></span></div>',
      '<div class="shell">',
        '<div class="hero-topline reveal">',
          '<div><span class="availability-dot"></span><span class="mono">Open to engineering roles · research · collaboration</span></div>',
          '<span class="mono">©2026 / Engineering portfolio</span>',
        '</div>',
        '<div class="hero-name-wrap">',
          '<h1 class="hero-name" aria-label="' + data.profile.name + '" data-split>',
            '<span>KARANVEER</span><span>SINGH</span>',
          '</h1>',
        '</div>',
        '<div class="hero-bottom">',
          '<div class="hero-copy reveal">',
            '<p class="hero-role">' + data.profile.tagline + '</p>',
            '<p class="hero-summary">' + data.profile.summary + '</p>',
            '<div class="hero-actions">',
              '<a class="ak-btn ak-btn-solid magnetic" href="#work" data-cursor="VIEW"><span>Selected work ↘</span></a>',
              '<a class="ak-btn ak-btn-ghost magnetic" href="#about"><span>About me</span></a>',
            '</div>',
          '</div>',
          renderFieldControls(),
        '</div>',
      '</div>',
    '</section>',
    '<div class="ak-marquee" aria-hidden="true"><div class="ak-marquee-track">',
      ['EMBEDDED SYSTEMS','CONTROL','PCB DESIGN','VERIFICATION','ROBOTICS','POWER ELECTRONICS','SENSING','RESEARCH','EMBEDDED SYSTEMS','CONTROL','PCB DESIGN','VERIFICATION','ROBOTICS','POWER ELECTRONICS','SENSING','RESEARCH'].map(item => '<span>' + item + '</span>').join(''),
    '</div></div>'
  ].join('');
}

function renderAbout() {
  const timeline = data.experience.slice(0, 4);
  return [
    '<section id="about" class="ak-section ak-about" data-field-mode="ambient">',
      '<div class="shell">',
        '<div class="ak-sec-head reveal"><span class="ak-tag">About</span><span class="ak-line"></span><span class="ak-sec-title">Engineer first. Curious about the whole system.</span></div>',
        '<div class="about-grid">',
          '<div class="about-copy">',
            '<h2 class="about-heading reveal">I like work where <em>hardware, software and physical systems</em> have to agree.</h2>',
            '<p class="reveal">' + data.profile.summary + '</p>',
            '<p class="reveal">This site is deliberately broader than a CV: it shows requirements, architecture, experiments, failures, measurements and what changed after testing.</p>',
            '<div class="about-tags reveal">',
              ['Embedded systems','PCB design','Control','Power electronics','Verification','Research'].map(item => '<span>' + item + '</span>').join(''),
            '</div>',
          '</div>',
          '<div class="about-side">',
            '<figure class="portrait-card reveal" data-tilt>',
              '<img src="' + data.profile.portrait.src + '" alt="' + data.profile.portrait.alt + '">',
              '<figcaption><strong>' + data.profile.name + '</strong><span>' + data.profile.role + '</span></figcaption>',
            '</figure>',
            '<div class="timeline">',
              timeline.map((item, index) => [
                '<div class="timeline-row reveal">',
                  '<span>' + item.period + '</span>',
                  '<div><strong>' + item.title + '</strong><small>' + item.organisation + '</small></div>',
                '</div>'
              ].join('')).join(''),
            '</div>',
          '</div>',
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderSkills() {
  return [
    '<section id="skills" class="ak-section ak-skills" data-field-mode="ambient">',
      '<div class="shell">',
        '<div class="ak-sec-head reveal"><span class="ak-tag">Capabilities</span><span class="ak-line"></span><span class="ak-sec-title">What I work with</span></div>',
        '<div class="service-list">',
          data.skills.map((group, index) => [
            '<article class="service-row reveal">',
              '<span class="service-num">' + String(index + 1).padStart(2, '0') + '</span>',
              '<h3>' + group.title + '</h3>',
              '<p>' + group.description + '</p>',
              '<div class="service-links">',
                group.projectIds.slice(0, 3).map(id => {
                  const project = data.projects.find(p => p.id === id);
                  return project ? '<a href="' + projectUrl(project) + '">' + project.title + ' ↗</a>' : '';
                }).join(''),
              '</div>',
            '</article>'
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function projectEvidence(project) {
  const seen = new Set();
  const images = [];
  const candidates = [
    project.coverImage ? { src: project.coverImage, caption: project.title } : null,
    ...(project.gallery || [])
  ].filter(Boolean);
  candidates.forEach(item => {
    if (!seen.has(item.src)) {
      seen.add(item.src);
      images.push(item);
    }
  });
  return images.slice(0, 4);
}

function renderProjectPanel(project, index) {
  const evidence = projectEvidence(project);
  const cover = evidence[0];
  const fieldMode = ({'aurora-vx':'flight','advanced-2wd-robot-controller':'pcb','formula-student-electrical':'can','pysignalscope':'signal'}[project.id] || 'ambient');
  return [
    '<article class="project-panel" data-field-mode="' + fieldMode + '" style="--panel-index:' + index + '">',
      '<div class="shell panel-grid">',
        '<div class="panel-visual reveal" data-tilt data-cursor="VIEW">',
          '<span class="panel-bgmark">' + (project.title.split(/\s+/).map(x=>x[0]).join('').slice(0,3).toUpperCase()) + '</span>',
          cover ? '<div class="evidence-main"><img src="' + cover.src + '" alt="' + (cover.caption || project.title) + '" data-evidence-main></div>' : '<div class="evidence-placeholder"><span>' + project.category + '</span><strong>' + project.title + '</strong></div>',
          evidence.length > 1 ? '<div class="evidence-thumbs" aria-label="Project evidence images">' + evidence.map((img, i) => '<button type="button" class="evidence-thumb ' + (i===0?'is-active':'') + '" data-src="' + img.src + '" data-alt="' + (img.caption || project.title).replace(/"/g,'&quot;') + '" aria-label="Show evidence image ' + (i+1) + '"><img src="' + img.src + '" alt=""></button>').join('') + '</div>' : '',
        '</div>',
        '<div class="panel-info">',
          '<div class="panel-num">' + String(index + 1).padStart(2, '0') + ' — ' + project.category + '</div>',
          '<h3>' + project.title + '</h3>',
          '<p class="panel-subtitle">' + project.subtitle + '</p>',
          '<p>' + project.summary + '</p>',
          '<div class="panel-tags">' + project.skills.slice(0, 6).map(skill => '<span>' + skill + '</span>').join('') + '</div>',
          '<div class="panel-actions">',
            '<a class="ak-btn ak-btn-solid magnetic" href="' + projectUrl(project) + '" data-cursor="OPEN"><span>Read case study ↗</span></a>',
            project.links && project.links[0] ? '<a class="ak-btn ak-btn-ghost magnetic" href="' + project.links[0].href + '" target="_blank" rel="noreferrer" data-cursor="VISIT"><span>' + project.links[0].label + '</span></a>' : '',
          '</div>',
        '</div>',
      '</div>',
    '</article>'
  ].join('');
}

function renderWork() {
  const featureIds = ['aurora-vx','advanced-2wd-robot-controller','formula-student-electrical','pysignalscope'];
  const selected = featureIds.map(id => data.projects.find(p => p.id === id)).filter(Boolean);
  const selectedSet = new Set(featureIds);
  const more = data.projects.filter(p => !selectedSet.has(p.id));

  return [
    '<section id="work" class="ak-section ak-work">',
      '<div class="shell"><div class="ak-sec-head reveal"><span class="ak-tag">Selected work</span><span class="ak-line"></span><span class="ak-sec-title">Things I have built, tested and defended.</span></div></div>',
      '<div class="project-stack">' + selected.map(renderProjectPanel).join('') + '</div>',
      '<div class="shell more-projects">',
        '<div class="more-head reveal"><span class="mono">More projects</span><span>' + more.length + ' additional engineering records</span></div>',
        '<div class="more-grid">',
          more.map((project, index) => [
            '<a class="mini-project reveal" href="' + projectUrl(project) + '">',
              '<span class="mini-num">' + String(index + selected.length + 1).padStart(2,'0') + '</span>',
              '<strong>' + project.title + '</strong>',
              '<p>' + project.summary + '</p>',
              '<div><span>' + project.category + '</span><b>↗</b></div>',
            '</a>'
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderWriting() {
  return [
    '<section id="writing" class="ak-section ak-writing" data-field-mode="signal-soft">',
      '<div class="shell">',
        '<div class="ak-sec-head reveal"><span class="ak-tag">Writing</span><span class="ak-line"></span><span class="ak-sec-title">Engineering, explained in public.</span></div>',
        '<div class="writing-list">',
          data.writing.map((item, index) => [
            '<a class="writing-row reveal" href="' + item.href + '" target="_blank" rel="noreferrer" data-cursor="OPEN">',
              '<span>' + String(index+1).padStart(2,'0') + '</span>',
              '<small>' + item.category + '</small>',
              '<strong>' + item.title + '</strong>',
              '<b>↗</b>',
            '</a>'
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderContact() {
  return [
    '<section id="contact" class="ak-contact" data-field-mode="ambient">',
      '<div class="contact-glow" aria-hidden="true"></div>',
      '<div class="shell">',
        '<div class="ak-sec-head reveal"><span class="ak-tag">Get in touch</span><span class="ak-line"></span></div>',
        '<h2 class="contact-head reveal">Let’s build something <em>worth testing.</em></h2>',
        '<p class="contact-copy reveal">I am interested in engineering roles, placements, research opportunities and collaborations across embedded systems, electronics, control, robotics, power and verification.</p>',
        '<div class="contact-links reveal">',
          data.profile.links.map(link => '<a href="' + link.href + '" target="_blank" rel="noreferrer" data-cursor="VISIT">' + link.label + ' <span>↗</span></a>').join(''),
          cvLink('CV ↓'),
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function renderFooter() {
  $('#footer').innerHTML = [
    '<div class="shell footer-grid">',
      '<div><strong>Engineering evidence, deliberately.</strong><span>© ' + new Date().getFullYear() + ' ' + data.profile.name + '</span></div>',
      '<div><a href="#hero">Home</a><a href="#work">Work</a><a href="#writing">Writing</a><a href="#contact">Contact</a></div>',
      '<div><a href="https://github.com/MooMooCow29" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/karan-singh-6901a7246/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://medium.com/@ks683557" target="_blank" rel="noreferrer">Medium ↗</a></div>',
    '</div>',
    '<div class="footer-word" aria-hidden="true">KARANVEER</div>'
  ].join('');
}

function renderCursor() {
  document.body.insertAdjacentHTML('beforeend','<div class="cursor-dot" aria-hidden="true"></div><div class="cursor-ring" aria-hidden="true"><span></span></div>');
}

function render() {
  renderHeader();
  $('#app').innerHTML = [renderLabIntro(), renderHero(), renderAbout(), renderSkills(), renderWork(), renderWriting(), renderContact()].join('');
  renderFooter();
  renderCursor();
}

render();
