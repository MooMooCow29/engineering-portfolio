(() => {
  if (!document.body.classList.contains('home-template')) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  const canvas = document.createElement('canvas');
  canvas.className = 'engineering-field';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let last = performance.now();
  let mode = 'system';
  let focusedDomain = '';
  let active = true;
  let palette = {};
  const pointer = { x: 0, y: 0, active: false };
  const nodes = [];

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;

  function toRgba(hex, alpha) {
    const value = (hex || '#ffffff').trim();
    if (!value.startsWith('#')) return 'rgba(255,255,255,' + alpha + ')';
    const raw = value.slice(1);
    const expanded = raw.length === 3 ? raw.split('').map(ch => ch + ch).join('') : raw;
    const n = parseInt(expanded, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function readPalette() {
    const style = getComputedStyle(document.body);
    palette = {
      ink: style.getPropertyValue('--ak-ink').trim() || '#f2efe8',
      muted: style.getPropertyValue('--ak-muted').trim() || '#9ea2aa',
      line: style.getPropertyValue('--ak-line').trim() || '#2a2d34',
      accent: style.getPropertyValue('--ak-accent').trim() || '#ff6b3d',
      accent2: style.getPropertyValue('--ak-accent-2').trim() || '#8ea2ff',
      bg: style.getPropertyValue('--ak-bg').trim() || '#0b0c10'
    };
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = width < 700 ? 22 : width < 1100 ? 34 : 46;
    while (nodes.length < target) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .15,
        vy: (Math.random() - .5) * .15,
        r: 1 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2
      });
    }
    if (nodes.length > target) nodes.length = target;
    readPalette();
  }

  function updateNodes(dt, time) {
    const speed = clamp(dt / 16.67, .4, 2.2);
    for (const node of nodes) {
      node.vx += Math.sin(time * .00022 + node.phase) * .0015 * speed;
      node.vy += Math.cos(time * .00019 + node.phase * 1.7) * .0015 * speed;

      if (pointer.active && finePointer) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const dist = Math.hypot(dx, dy) || 1;
        const range = 190;
        if (dist < range) {
          const force = (1 - dist / range) * .026 * speed;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
          const tangent = .009 * (1 - dist / range) * speed;
          node.vx += (-dy / dist) * tangent;
          node.vy += (dx / dist) * tangent;
        }
      }

      const maxV = .34;
      node.vx = clamp(node.vx, -maxV, maxV);
      node.vy = clamp(node.vy, -maxV, maxV);
      node.x += node.vx * speed;
      node.y += node.vy * speed;

      const margin = 40;
      if (node.x < -margin) node.x = width + margin;
      if (node.x > width + margin) node.x = -margin;
      if (node.y < -margin) node.y = height + margin;
      if (node.y > height + margin) node.y = -margin;
    }
  }

  function drawNetwork(time) {
    const maxDist = width < 700 ? 118 : 155;
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > maxDist) continue;
        const alpha = (1 - dist / maxDist) * .17;
        ctx.strokeStyle = toRgba(palette.muted, alpha);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (((i * 11 + j * 7) % 23) === 0) {
          const p = (time * .00013 + (i + j) * .071) % 1;
          const px = lerp(a.x, b.x, p);
          const py = lerp(a.y, b.y, p);
          ctx.fillStyle = toRgba(palette.accent, .72);
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (const node of nodes) {
      ctx.fillStyle = toRgba(palette.ink, .34);
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawSystem(time) {
    const anchors = {
      sense: [width * .19, height * .42],
      control: [width * .52, height * .22],
      power: [width * .82, height * .43],
      verify: [width * .54, height * .74]
    };
    const keys = ['sense', 'control', 'power', 'verify'];

    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.strokeStyle = toRgba(palette.accent2, .18);
    ctx.beginPath();
    keys.forEach((key, index) => {
      const p = anchors[key];
      if (index === 0) ctx.moveTo(p[0], p[1]);
      else ctx.lineTo(p[0], p[1]);
    });
    ctx.lineTo(anchors.sense[0], anchors.sense[1]);
    ctx.stroke();
    ctx.setLineDash([]);

    keys.forEach((key, index) => {
      const point = anchors[key];
      const x = point[0], y = point[1];
      const isFocus = focusedDomain === key;
      const pulse = 1 + Math.sin(time * .002 + index) * .15;
      ctx.strokeStyle = toRgba(isFocus ? palette.accent : palette.accent2, isFocus ? .9 : .32);
      ctx.lineWidth = isFocus ? 1.7 : 1;
      ctx.beginPath();
      ctx.arc(x, y, (isFocus ? 25 : 13) * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = toRgba(isFocus ? palette.accent : palette.ink, isFocus ? .85 : .45);
      ctx.beginPath();
      ctx.arc(x, y, isFocus ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawFlight(time) {
    const pts = [
      [width * .09, height * .68],
      [width * .24, height * .59],
      [width * .40, height * .38],
      [width * .58, height * .47],
      [width * .72, height * .29],
      [width * .91, height * .42]
    ];

    ctx.lineWidth = 1.2;
    ctx.strokeStyle = toRgba(palette.accent2, .38);
    ctx.setLineDash([8, 7]);
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
    ctx.setLineDash([]);

    pts.forEach((p, i) => {
      ctx.fillStyle = toRgba(i === pts.length - 1 ? palette.accent : palette.ink, .66);
      ctx.beginPath();
      ctx.arc(p[0], p[1], i === pts.length - 1 ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    const raw = time * .00022;
    const seg = Math.floor(raw % (pts.length - 1));
    const local = raw % 1;
    const a = pts[seg], b = pts[seg + 1];
    ctx.fillStyle = toRgba(palette.accent, .95);
    ctx.beginPath();
    ctx.arc(lerp(a[0], b[0], local), lerp(a[1], b[1], local), 3.1, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 7; i++) {
      const x = width * (.12 + i * .12);
      const y = height * (.2 + Math.sin(i * 1.3) * .03);
      ctx.strokeStyle = toRgba(palette.muted, .12);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 45, y + 16);
      ctx.stroke();
    }
  }

  function drawPCB(time) {
    const grid = width < 700 ? 66 : 84;
    const offsetX = (time * .008) % grid;
    ctx.lineWidth = 1;

    for (let y = grid * .7; y < height; y += grid) {
      ctx.strokeStyle = toRgba(palette.accent2, .10);
      ctx.beginPath();
      let x = -grid + offsetX;
      ctx.moveTo(x, y);
      while (x < width + grid) {
        const span = grid * (1.2 + ((y / grid) % 3) * .22);
        ctx.lineTo(x + span * .55, y);
        ctx.lineTo(x + span * .55, y + grid * .28);
        ctx.lineTo(x + span, y + grid * .28);
        x += span + grid * .42;
      }
      ctx.stroke();
    }

    for (let i = 0; i < 16; i++) {
      const x = ((i * 137 + 91) % Math.max(width, 1));
      const y = ((i * 89 + 57) % Math.max(height, 1));
      const glow = ((time * .001 + i * .17) % 1);
      ctx.strokeStyle = toRgba(palette.accent, .20 + glow * .28);
      ctx.beginPath();
      ctx.arc(x, y, 4 + glow * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = toRgba(palette.ink, .25);
      ctx.beginPath();
      ctx.arc(x, y, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCAN(time) {
    const y = height * .62;
    const nodesX = [width*.12, width*.29, width*.47, width*.68, width*.86];
    ctx.strokeStyle = toRgba(palette.accent2, .38);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(width * .06, y);
    ctx.lineTo(width * .94, y);
    ctx.stroke();

    nodesX.forEach((x, i) => {
      const branch = 80 + (i % 2) * 38;
      ctx.strokeStyle = toRgba(palette.muted, .25);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - branch);
      ctx.stroke();
      ctx.strokeRect(x - 20, y - branch - 22, 40, 22);
      ctx.fillStyle = toRgba(palette.ink, .28);
      ctx.fillRect(x - 14, y - branch - 15, 28, 2);
    });

    for (let i = 0; i < 4; i++) {
      const p = (time * .00019 + i * .27) % 1;
      const x = lerp(width * .06, width * .94, p);
      ctx.fillStyle = toRgba(i % 2 ? palette.accent : palette.accent2, .9);
      ctx.fillRect(x - 5, y - 3, 10, 6);
    }
  }

  function drawSignal(time, soft) {
    const bands = soft ? 2 : 4;
    for (let band = 0; band < bands; band++) {
      const base = height * (.30 + band * .14);
      const amp = height * (.025 + band * .006);
      const freq = .014 + band * .0045;
      ctx.beginPath();
      for (let x = -5; x <= width + 5; x += 5) {
        const phase = x * freq + time * (.0012 + band * .00015);
        let y;
        if (band === 2 && !soft) y = base + (Math.sin(phase) >= 0 ? amp : -amp);
        else {
          const envelope = .72 + .28 * Math.sin(x * .0025 + band);
          y = base + Math.sin(phase) * amp * envelope;
        }
        if (x === -5) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = toRgba(band % 2 ? palette.accent2 : palette.accent, soft ? .13 : .22 + band * .045);
      ctx.lineWidth = band === 0 ? 1.4 : 1;
      ctx.stroke();
    }

    if (!soft) {
      const cursorX = (time * .055) % Math.max(width, 1);
      ctx.strokeStyle = toRgba(palette.ink, .16);
      ctx.beginPath();
      ctx.moveTo(cursorX, height * .18);
      ctx.lineTo(cursorX, height * .76);
      ctx.stroke();
    }
  }

  function drawMode(time) {
    if (mode === 'flight') drawFlight(time);
    else if (mode === 'pcb') drawPCB(time);
    else if (mode === 'can') drawCAN(time);
    else if (mode === 'signal') drawSignal(time, false);
    else if (mode === 'signal-soft') drawSignal(time, true);
    else if (mode === 'system') drawSystem(time);
  }

  function drawPointer() {
    if (!pointer.active || !finePointer) return;
    const radius = 76;
    const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
    grad.addColorStop(0, toRgba(palette.accent, .10));
    grad.addColorStop(1, toRgba(palette.accent, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function frame(now) {
    if (!active) return;
    const dt = now - last;
    last = now;
    ctx.clearRect(0, 0, width, height);
    if (!reduced) updateNodes(dt, now);
    drawNetwork(now);
    drawMode(now);
    drawPointer();
    if (!reduced) raf = requestAnimationFrame(frame);
  }

  function renderStatic() {
    ctx.clearRect(0, 0, width, height);
    drawNetwork(0);
    drawMode(0);
  }

  function setMode(next) {
    if (!next || next === mode) return;
    mode = next;
    canvas.dataset.mode = next;
    if (reduced) renderStatic();
  }

  function initModeObserver() {
    const sections = [...document.querySelectorAll('[data-field-mode]')];
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const ratios = new Map(sections.map(section => [section, 0]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => ratios.set(entry.target, entry.intersectionRatio));
      let best = null;
      let bestRatio = 0;
      ratios.forEach((ratio, section) => {
        if (ratio > bestRatio) {
          best = section;
          bestRatio = ratio;
        }
      });
      if (best && bestRatio > .12) setMode(best.dataset.fieldMode || 'ambient');
    }, { threshold: [0, .12, .25, .4, .6, .8], rootMargin: '-10% 0px -10% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  function initFieldControls() {
    const detail = document.querySelector('[data-field-detail]');
    const controls = [...document.querySelectorAll('[data-field-focus]')];
    controls.forEach(control => {
      const activate = () => {
        focusedDomain = control.dataset.fieldFocus || '';
        controls.forEach(item => item.classList.toggle('is-active', item === control));
        if (detail) detail.textContent = control.dataset.detail || '';
        if (reduced) renderStatic();
      };
      control.addEventListener('mouseenter', activate);
      control.addEventListener('focus', activate);
      control.addEventListener('click', activate);
    });
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', event => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });
  window.addEventListener('pointerleave', () => { pointer.active = false; }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    active = !document.hidden;
    if (active && !reduced) {
      last = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    } else cancelAnimationFrame(raf);
  });

  const themeButton = document.querySelector('[data-theme-toggle]');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      window.setTimeout(() => {
        readPalette();
        if (reduced) renderStatic();
      }, 0);
    });
  }

  resize();
  initModeObserver();
  initFieldControls();
  canvas.dataset.mode = mode;
  if (reduced) renderStatic();
  else raf = requestAnimationFrame(frame);
})();
