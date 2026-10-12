(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  function initTheme() {
    const root = document.documentElement;
    const button = document.querySelector('[data-theme-toggle]');
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light') root.classList.add('light');
    if (!button) return;
    button.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('portfolio-theme', root.classList.contains('light') ? 'light' : 'dark');
    });
  }

  function initHeader() {
    const header = document.getElementById('top');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initReveals() {
    document.querySelectorAll('.case-template .case-block-v2, .case-template .gallery-item-v2, .case-template .project-intro-grid-v2, .case-template .project-hero-media-v2, .case-template .related-v2').forEach(el => el.classList.add('reveal'));
    const items = [...document.querySelectorAll('.reveal')];
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el, index) => {
      el.style.setProperty('--reveal-delay', Math.min(index % 6, 5) * 55 + 'ms');
      io.observe(el);
    });
  }

  function initSectionLines() {
    const lines = [...document.querySelectorAll('.ak-line')];
    if (reduced || !('IntersectionObserver' in window)) {
      lines.forEach(line => line.classList.add('is-drawn'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    lines.forEach(line => io.observe(line));
  }

  function initSplitHero() {
    const hero = document.querySelector('[data-split]');
    if (!hero) return;
    [...hero.children].forEach(line => {
      const text = line.textContent;
      line.textContent = '';
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--char-index', index);
        line.appendChild(span);
      });
    });
    requestAnimationFrame(() => hero.classList.add('is-ready'));
  }

  function initCursor() {
    if (!finePointer || reduced) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const label = ring && ring.querySelector('span');
    if (!dot || !ring || !label) return;

    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y;
    let frame = 0;

    const render = () => {
      rx += (x - rx) * 0.17;
      ry += (y - ry) * 0.17;
      dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    window.addEventListener('pointermove', event => {
      x = event.clientX; y = event.clientY;
      document.body.classList.add('has-pointer');
    }, { passive: true });

    document.addEventListener('pointerover', event => {
      const target = event.target.closest('[data-cursor]');
      if (!target) return;
      ring.classList.add('is-active');
      label.textContent = target.dataset.cursor || '';
    });
    document.addEventListener('pointerout', event => {
      const target = event.target.closest('[data-cursor]');
      if (!target) return;
      ring.classList.remove('is-active');
      label.textContent = '';
    });
    window.addEventListener('blur', () => cancelAnimationFrame(frame), { once: true });
  }

  function initMagnetic() {
    if (!finePointer || reduced) return;
    document.querySelectorAll('.magnetic').forEach(element => {
      element.addEventListener('pointermove', event => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        element.style.transform = 'translate(' + (dx * .12) + 'px,' + (dy * .12) + 'px)';
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  }

  function initTilt() {
    if (!finePointer || reduced) return;
    document.querySelectorAll('[data-tilt]').forEach(element => {
      element.addEventListener('pointermove', event => {
        const rect = element.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - .5;
        const ny = (event.clientY - rect.top) / rect.height - .5;
        element.style.setProperty('--tilt-x', (-ny * 3.6) + 'deg');
        element.style.setProperty('--tilt-y', (nx * 4.8) + 'deg');
        element.style.setProperty('--shine-x', ((nx + .5) * 100) + '%');
        element.style.setProperty('--shine-y', ((ny + .5) * 100) + '%');
      });
      element.addEventListener('pointerleave', () => {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  function initEvidenceSwitchers() {
    document.querySelectorAll('.panel-visual').forEach(panel => {
      const main = panel.querySelector('[data-evidence-main]');
      if (!main) return;
      panel.querySelectorAll('.evidence-thumb').forEach(button => {
        button.addEventListener('click', () => {
          panel.querySelectorAll('.evidence-thumb').forEach(item => item.classList.remove('is-active'));
          button.classList.add('is-active');
          main.classList.add('is-switching');
          const src = button.dataset.src;
          const alt = button.dataset.alt || '';
          window.setTimeout(() => {
            main.src = src;
            main.alt = alt;
            main.classList.remove('is-switching');
          }, reduced ? 0 : 160);
        });
      });
    });
  }

  function initSystemMap() {
    const map = document.querySelector('[data-system-map]');
    if (!map) return;
    const detail = map.querySelector('.system-map-detail');
    const nodes = [...map.querySelectorAll('.system-node')];

    function activate(node) {
      nodes.forEach(item => item.classList.toggle('is-active', item === node));
      if (detail) detail.textContent = node.dataset.detail || '';
      map.dataset.active = node.dataset.node || '';
    }

    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => activate(node));
      node.addEventListener('focus', () => activate(node));
      node.addEventListener('click', () => activate(node));
    });

    if (finePointer && !reduced) {
      map.addEventListener('pointermove', event => {
        const rect = map.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - .5;
        const ny = (event.clientY - rect.top) / rect.height - .5;
        map.style.setProperty('--map-x', (nx * 10) + 'px');
        map.style.setProperty('--map-y', (ny * 8) + 'px');
      });
      map.addEventListener('pointerleave', () => {
        map.style.setProperty('--map-x', '0px');
        map.style.setProperty('--map-y', '0px');
      });
    }
  }

  function initHeroDepth() {
    if (reduced) return;
    const hero = document.querySelector('.ak-hero');
    const name = document.querySelector('.hero-name');
    if (!hero || !name) return;
    let ticking = false;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      name.style.transform = 'translateY(' + (progress * 26) + 'px) scale(' + (1 - progress * .025) + ')';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  initTheme();
  initHeader();
  initSplitHero();
  initReveals();
  initSectionLines();
  initCursor();
  initMagnetic();
  initTilt();
  initEvidenceSwitchers();
  initSystemMap();
  initHeroDepth();
})();
