(() => {
  const canvas = document.getElementById('lab-canvas');
  const section = document.getElementById('lab');
  if (!canvas || !section) return;

  const entry = section.querySelector('[data-lab-entry]');
  const exploreUi = section.querySelector('[data-lab-explore]');
  const enterButton = section.querySelector('[data-lab-enter]');
  const loader = section.querySelector('[data-lab-loader]');
  const label = section.querySelector('[data-lab-label]');
  const labelType = section.querySelector('[data-lab-label-type]');
  const labelTitle = section.querySelector('[data-lab-label-title]');
  const listLinks = [...section.querySelectorAll('[data-lab-hotspot]')];

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer:coarse)').matches;
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';

  let three;
  let renderer;
  let scene;
  let camera;
  let raycaster;
  let pointer;
  let clock;
  let raf = 0;
  let visible = true;
  let exploring = false;
  let hovered = null;
  let targetCam = null;
  let targetLook = null;
  let waveformTexture = null;
  let waveformCanvas = null;
  let waveformCtx = null;
  const hotspotMeshes = [];
  const hotspotGroups = new Map();
  const parallax = { x: 0, y: 0 };

  const projectMap = {
    scope: {
      type: 'OSCILLOSCOPE',
      title: 'pySignalScope',
      href: 'projects/pysignalscope/'
    },
    pcb: {
      type: 'CONTROLLER PCB',
      title: 'Advanced 2WD Robot Controller',
      href: 'projects/advanced-2wd-robot-controller/'
    },
    robot: {
      type: 'ROBOT PLATFORM',
      title: 'Obstacle Avoidance Robot',
      href: 'projects/obstacle-avoidance-robot/'
    },
    epaper: {
      type: 'E-PAPER',
      title: 'Batteryless ePaper Research',
      href: 'projects/energy-harvesting-epaper/'
    },
    aurora: {
      type: 'AVIONICS CONSOLE',
      title: 'AURORA-VX',
      href: 'projects/aurora-vx/'
    },
    formula: {
      type: 'VEHICLE ELECTRONICS',
      title: 'Formula Student Electrical Systems',
      href: 'projects/formula-student-electrical/'
    }
  };

  function showFallback() {
    section.classList.add('lab-no-webgl');
    if (loader) loader.hidden = true;
    if (exploreUi) exploreUi.hidden = false;
    if (entry) entry.classList.add('is-ready');
  }

  function canvasTexture(textLines, options = {}) {
    const c = document.createElement('canvas');
    c.width = options.width || 1024;
    c.height = options.height || 512;
    const ctx = c.getContext('2d');
    const bg = options.bg || '#0a0d12';
    const fg = options.fg || '#f2efe8';
    const accent = options.accent || '#ff6b3d';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = options.grid || 'rgba(255,255,255,.08)';
    ctx.lineWidth = 1;
    const grid = 48;
    for (let x = 0; x < c.width; x += grid) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, c.height); ctx.stroke();
    }
    for (let y = 0; y < c.height; y += grid) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke();
    }

    ctx.fillStyle = accent;
    ctx.font = '700 24px monospace';
    ctx.fillText(options.kicker || 'ENGINEERING PORTFOLIO', 48, 60);

    ctx.fillStyle = fg;
    ctx.font = '800 58px Arial, sans-serif';
    let y = 138;
    textLines.forEach(line => {
      ctx.fillText(line, 48, y);
      y += 70;
    });

    if (options.footer) {
      ctx.fillStyle = 'rgba(242,239,232,.6)';
      ctx.font = '18px monospace';
      ctx.fillText(options.footer, 48, c.height - 42);
    }

    const tex = new three.CanvasTexture(c);
    tex.colorSpace = three.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  function makeMaterial(color, roughness = .68, metalness = .08) {
    return new three.MeshStandardMaterial({ color, roughness, metalness });
  }

  function markHotspot(object, id) {
    const meta = projectMap[id];
    if (!meta) return;
    object.userData.hotspot = id;
    object.userData.meta = meta;
    hotspotMeshes.push(object);
    if (!hotspotGroups.has(id)) hotspotGroups.set(id, []);
    hotspotGroups.get(id).push(object);
  }

  function setObjectGlow(id, on) {
    const objects = hotspotGroups.get(id) || [];
    objects.forEach(obj => {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(mat => {
        if (!mat || !('emissive' in mat)) return;
        if (!mat.userData.originalEmissive) {
          mat.userData.originalEmissive = mat.emissive.clone();
          mat.userData.originalIntensity = mat.emissiveIntensity || 0;
        }
        if (on) {
          mat.emissive.set('#ff6b3d');
          mat.emissiveIntensity = .55;
        } else {
          mat.emissive.copy(mat.userData.originalEmissive);
          mat.emissiveIntensity = mat.userData.originalIntensity;
        }
      });
    });
  }

  function addDesk() {
    const group = new three.Group();
    scene.add(group);

    const top = new three.Mesh(
      new three.BoxGeometry(8.8, .22, 4.7),
      makeMaterial('#594133', .72, .05)
    );
    top.position.set(0, 0, 0);
    top.receiveShadow = true;
    group.add(top);

    const legMat = makeMaterial('#11141a', .45, .62);
    const legGeo = new three.BoxGeometry(.24, 2.8, .24);
    [[-3.8,-1.55],[3.8,-1.55],[-3.8,1.55],[3.8,1.55]].forEach(([x,z]) => {
      const leg = new three.Mesh(legGeo, legMat);
      leg.position.set(x, -1.45, z);
      leg.castShadow = true;
      group.add(leg);
    });

    const cableTray = new three.Mesh(
      new three.BoxGeometry(6.8, .12, .55),
      makeMaterial('#171a21', .4, .68)
    );
    cableTray.position.set(0, -.48, 1.55);
    group.add(cableTray);
  }

  function addMonitor() {
    const group = new three.Group();
    group.position.set(-.35, 1.5, .45);
    scene.add(group);

    const frameMat = makeMaterial('#10131a', .34, .52);
    const frame = new three.Mesh(new three.BoxGeometry(3.3, 2.05, .18), frameMat);
    frame.castShadow = true;
    group.add(frame);

    const tex = canvasTexture(['KARANVEER SINGH', 'ENGINEERING WORKBENCH'], {
      width: 1200, height: 720, kicker: 'PORTFOLIO // 2026',
      footer: 'SELECT AN OBJECT OR CONTINUE TO THE FULL PROJECT INDEX'
    });
    const screenMat = new three.MeshStandardMaterial({
      map: tex, emissive: '#253147', emissiveIntensity: .34, roughness: .32
    });
    const screen = new three.Mesh(new three.PlaneGeometry(3.05, 1.78), screenMat);
    screen.position.z = .101;
    group.add(screen);

    const neck = new three.Mesh(new three.BoxGeometry(.18, .8, .16), frameMat);
    neck.position.y = -1.37;
    group.add(neck);
    const base = new three.Mesh(new three.BoxGeometry(1.25, .12, .74), frameMat);
    base.position.set(0, -1.78, .2);
    group.add(base);

    const auroraTex = canvasTexture(['AURORA-VX', 'ASSURANCE'], {
      width: 680, height: 300, kicker: 'AVIONICS / DIGITAL TWIN',
      footer: 'TRACEABLE VERIFICATION'
    });
    const auroraMat = new three.MeshStandardMaterial({
      map: auroraTex, emissive: '#17243b', emissiveIntensity: .44, roughness: .32
    });
    const aux = new three.Mesh(new three.BoxGeometry(1.6, .86, .12), frameMat);
    aux.position.set(2.35, -.2, .03);
    aux.rotation.y = -.08;
    group.add(aux);
    const auxScreen = new three.Mesh(new three.PlaneGeometry(1.45, .70), auroraMat);
    auxScreen.position.set(2.35, -.2, .095);
    auxScreen.rotation.y = -.08;
    group.add(auxScreen);
    markHotspot(auxScreen, 'aurora');
  }

  function addScope() {
    const group = new three.Group();
    group.position.set(2.55, .64, -.85);
    group.rotation.y = -.22;
    scene.add(group);

    const bodyMat = makeMaterial('#d3d5d8', .52, .28);
    const darkMat = makeMaterial('#151820', .42, .58);
    const body = new three.Mesh(new three.BoxGeometry(2.15, 1.28, 1.38), bodyMat);
    body.castShadow = true;
    group.add(body);

    waveformCanvas = document.createElement('canvas');
    waveformCanvas.width = 720;
    waveformCanvas.height = 360;
    waveformCtx = waveformCanvas.getContext('2d');
    waveformTexture = new three.CanvasTexture(waveformCanvas);
    waveformTexture.colorSpace = three.SRGBColorSpace;

    const screenMat = new three.MeshStandardMaterial({
      map: waveformTexture, emissive: '#102616', emissiveIntensity: .7, roughness: .28
    });
    const screen = new three.Mesh(new three.PlaneGeometry(1.26, .78), screenMat);
    screen.position.set(-.28, .12, .696);
    group.add(screen);
    markHotspot(screen, 'scope');

    for (let i = 0; i < 7; i++) {
      const knob = new three.Mesh(new three.CylinderGeometry(.08, .08, .08, 24), darkMat);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(.72 + (i % 2) * .28, .36 - Math.floor(i / 2) * .24, .735);
      group.add(knob);
    }
  }

  function updateScope(t) {
    if (!waveformCtx || !waveformTexture) return;
    const ctx = waveformCtx;
    const w = waveformCanvas.width, h = waveformCanvas.height;
    ctx.fillStyle = '#07110c';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(91,255,129,.10)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 45) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
    for (let y = 0; y < h; y += 45) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }

    ctx.strokeStyle = '#78ff8e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 0; x < w; x += 4) {
      const phase = x * .025 + t * .002;
      const y = h * .48 + Math.sin(phase) * 82 + Math.sin(phase * 3.2) * 12;
      if (x === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.stroke();

    ctx.fillStyle = '#9fffb0';
    ctx.font = '700 16px monospace';
    ctx.fillText('CH1  112.4 kHz', 24, 30);
    ctx.fillText('5.00 V/div', 24, h - 22);
    waveformTexture.needsUpdate = true;
  }

  function addPCB() {
    const group = new three.Group();
    group.position.set(-2.75, .32, -.9);
    group.rotation.y = .18;
    scene.add(group);

    const boardMat = makeMaterial('#173b2c', .56, .18);
    const board = new three.Mesh(new three.BoxGeometry(2.15, .09, 1.55), boardMat);
    board.castShadow = true;
    group.add(board);
    markHotspot(board, 'pcb');

    const chipMat = makeMaterial('#111216', .52, .26);
    const copperMat = makeMaterial('#d19957', .32, .62);

    for (let i = 0; i < 5; i++) {
      const chip = new three.Mesh(
        new three.BoxGeometry(.24 + (i % 2) * .22, .12, .28 + ((i + 1) % 2) * .18),
        chipMat
      );
      chip.position.set(-.72 + i * .36, .105, -.12 + (i % 2) * .42);
      group.add(chip);
    }

    for (let i = 0; i < 18; i++) {
      const via = new three.Mesh(new three.CylinderGeometry(.025,.025,.025,14), copperMat);
      via.position.set(-.9 + (i % 9) * .22, .065, -.62 + Math.floor(i / 9) * 1.22);
      group.add(via);
    }

    const traceMat = new three.MeshBasicMaterial({ color:'#c48647' });
    for (let i = 0; i < 6; i++) {
      const trace = new three.Mesh(new three.BoxGeometry(.9 - i*.08, .008, .018), traceMat);
      trace.position.set(-.18 + i*.08, .051, -.48 + i*.17);
      group.add(trace);
    }
  }

  function addRobot() {
    const group = new three.Group();
    group.position.set(-2.35, .36, 1.22);
    group.rotation.y = .12;
    scene.add(group);

    const chassis = new three.Mesh(
      new three.BoxGeometry(1.75, .12, 1.18),
      makeMaterial('#5a432e', .74, .04)
    );
    chassis.castShadow = true;
    group.add(chassis);
    markHotspot(chassis, 'robot');

    const wheelMat = makeMaterial('#151515', .72, .12);
    const hubMat = makeMaterial('#e2ba2c', .62, .08);
    [-.92,.92].forEach(x => {
      [-.38,.38].forEach(z => {
        if (z > 0) return;
        const wheel = new three.Mesh(new three.CylinderGeometry(.34,.34,.22,28), wheelMat);
        wheel.rotation.z = Math.PI/2;
        wheel.position.set(x, -.06, z);
        group.add(wheel);
        const hub = new three.Mesh(new three.CylinderGeometry(.19,.19,.23,28), hubMat);
        hub.rotation.z = Math.PI/2;
        hub.position.copy(wheel.position);
        group.add(hub);
      });
    });

    const sensorMat = makeMaterial('#5f6870', .32, .62);
    const sensorBar = new three.Mesh(new three.BoxGeometry(.62,.18,.1), makeMaterial('#17345b',.5,.25));
    sensorBar.position.set(0,.22,-.57);
    group.add(sensorBar);
    [-.19,.19].forEach(x => {
      const can = new three.Mesh(new three.CylinderGeometry(.12,.12,.12,28), sensorMat);
      can.rotation.x = Math.PI/2;
      can.position.set(x,.22,-.64);
      group.add(can);
    });
  }

  function addEPaper() {
    const group = new three.Group();
    group.position.set(2.75, .15, 1.15);
    group.rotation.set(-.08,-.22,0);
    scene.add(group);

    const frame = new three.Mesh(
      new three.BoxGeometry(1.55,.08,1.05),
      makeMaterial('#23262c',.46,.35)
    );
    frame.castShadow = true;
    group.add(frame);

    const tex = canvasTexture(['BATTERYLESS', 'E-PAPER'], {
      width: 720, height: 450, bg:'#e9e7df', fg:'#101217',
      accent:'#e8552d', grid:'rgba(0,0,0,.04)',
      kicker:'ENERGY HARVESTING', footer:'NO BATTERY / UPDATE ON HARVESTED ENERGY'
    });
    const screenMat = new three.MeshStandardMaterial({ map:tex, roughness:.95 });
    const screen = new three.Mesh(new three.PlaneGeometry(1.38,.88), screenMat);
    screen.rotation.x = -Math.PI/2;
    screen.position.y = .045;
    group.add(screen);
    markHotspot(screen,'epaper');
  }

  function addFormulaModule() {
    const group = new three.Group();
    group.position.set(.55,.28,-1.25);
    group.rotation.y = -.06;
    scene.add(group);

    const box = new three.Mesh(
      new three.BoxGeometry(1.28,.38,.72),
      makeMaterial('#111318',.32,.62)
    );
    box.castShadow = true;
    group.add(box);
    markHotspot(box,'formula');

    const labelTex = canvasTexture(['FS ELECTRICAL'], {
      width: 600,height:220,bg:'#12151a',fg:'#f2efe8',accent:'#ff6b3d',
      kicker:'UEA FORMULA STUDENT',footer:'CAN / LV / SAFETY'
    });
    const labelMat = new three.MeshStandardMaterial({map:labelTex, emissive:'#151515', emissiveIntensity:.1});
    const plate = new three.Mesh(new three.PlaneGeometry(1.05,.28),labelMat);
    plate.rotation.x = -Math.PI/2;
    plate.position.y = .195;
    group.add(plate);

    for(let i=0;i<5;i++){
      const terminal = new three.Mesh(
        new three.CylinderGeometry(.055,.055,.15,16),
        makeMaterial(i%2 ? '#b53e32':'#2d3239',.42,.5)
      );
      terminal.position.set(-.42+i*.21,.08,-.42);
      group.add(terminal);
    }
  }

  function addSceneDetails() {
    const wall = new three.Mesh(
      new three.PlaneGeometry(18,10),
      makeMaterial('#0e1117',.95,0)
    );
    wall.position.set(0,2.4,-3.2);
    scene.add(wall);

    const floor = new three.Mesh(
      new three.PlaneGeometry(18,18),
      makeMaterial('#090b0f',.94,0)
    );
    floor.rotation.x = -Math.PI/2;
    floor.position.y = -2.82;
    floor.receiveShadow = true;
    scene.add(floor);

    const shelfMat = makeMaterial('#151922',.42,.62);
    const shelf = new three.Mesh(new three.BoxGeometry(7.5,.12,.55),shelfMat);
    shelf.position.set(0,3.05,-2.83);
    scene.add(shelf);

    for(let i=0;i<5;i++){
      const inst = new three.Mesh(
        new three.BoxGeometry(.85,.42,.46),
        makeMaterial(i%2 ? '#c8c9c7':'#272a31',.5,.32)
      );
      inst.position.set(-2.7+i*1.35,3.31,-2.68);
      scene.add(inst);
    }

    const lampStem = new three.Mesh(new three.CylinderGeometry(.035,.035,1.6,16),makeMaterial('#242830',.32,.65));
    lampStem.position.set(3.95,.88,1.6);
    scene.add(lampStem);
    const lampHead = new three.Mesh(new three.ConeGeometry(.34,.5,24,1,true),makeMaterial('#242830',.35,.65));
    lampHead.rotation.z = Math.PI;
    lampHead.position.set(3.95,1.73,1.6);
    scene.add(lampHead);

    const lampLight = new three.PointLight('#ffcf9f',20,5.6,1.7);
    lampLight.position.set(3.95,1.45,1.6);
    lampLight.castShadow = !coarse;
    scene.add(lampLight);
  }

  function buildScene() {
    scene = new three.Scene();
    scene.background = new three.Color('#090b0f');
    scene.fog = new three.FogExp2('#090b0f', .055);

    camera = new three.PerspectiveCamera(42, 1, .1, 50);
    camera.position.set(0, 4.2, 9.2);
    targetCam = new three.Vector3(0, 3.15, 7.25);
    targetLook = new three.Vector3(0, .65, 0);

    renderer = new three.WebGLRenderer({
      canvas,
      antialias: !coarse,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.65));
    renderer.shadowMap.enabled = !coarse;
    renderer.shadowMap.type = three.PCFSoftShadowMap;
    renderer.outputColorSpace = three.SRGBColorSpace;
    renderer.toneMapping = three.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    raycaster = new three.Raycaster();
    pointer = new three.Vector2(2, 2);
    clock = new three.Clock();

    const hemi = new three.HemisphereLight('#7f95c8','#1a0f0a',1.15);
    scene.add(hemi);

    const key = new three.DirectionalLight('#dce7ff', 2.7);
    key.position.set(-4,7,5);
    key.castShadow = !coarse;
    key.shadow.mapSize.set(coarse ? 512 : 1024, coarse ? 512 : 1024);
    scene.add(key);

    const accent = new three.PointLight('#ff5e39', 24, 7.5, 2);
    accent.position.set(-4.3,2.5,-1.2);
    scene.add(accent);

    const cool = new three.PointLight('#647cff', 18, 7, 2);
    cool.position.set(4.2,3,-1.8);
    scene.add(cool);

    addDesk();
    addSceneDetails();
    addMonitor();
    addScope();
    addPCB();
    addRobot();
    addEPaper();
    addFormulaModule();

    resize();
  }

  function resize() {
    if (!renderer || !camera) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    renderer.setSize(w,h,false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  }

  function updateCamera(dt) {
    if (!camera || !targetCam || !targetLook) return;
    const factor = reduced ? 1 : Math.min(1, dt * 2.8);
    const desired = targetCam.clone();
    if (exploring && !coarse) {
      desired.x += parallax.x * .48;
      desired.y += parallax.y * .22;
    }
    camera.position.lerp(desired, factor);
    const look = targetLook.clone();
    if (exploring && !coarse) {
      look.x += parallax.x * .26;
      look.y += parallax.y * .13;
    }
    camera.lookAt(look);
  }

  function renderLoop() {
    if (!renderer || !scene || !camera) return;
    const dt = Math.min(clock.getDelta(), .05);
    const t = performance.now();

    if (visible) {
      updateCamera(dt);
      if (!reduced) updateScope(t);
      renderer.render(scene,camera);
    }
    raf = requestAnimationFrame(renderLoop);
  }

  function enterLab() {
    exploring = true;
    document.body.classList.add('lab-exploring');
    entry?.classList.add('is-exiting');
    window.setTimeout(() => {
      if (entry) entry.hidden = true;
      if (exploreUi) exploreUi.hidden = false;
      exploreUi?.classList.add('is-visible');
    }, reduced ? 0 : 430);
    targetCam.set(0, 2.75, 6.35);
    targetLook.set(0, .55, -.12);
  }

  function findHotspot(intersections) {
    for (const hit of intersections) {
      let obj = hit.object;
      while (obj) {
        if (obj.userData && obj.userData.hotspot) return obj;
        obj = obj.parent;
      }
    }
    return null;
  }

  function setHovered(next, event) {
    const nextId = next?.userData?.hotspot || '';
    const prevId = hovered?.userData?.hotspot || '';
    if (prevId && prevId !== nextId) setObjectGlow(prevId,false);
    hovered = next || null;

    if (!nextId) {
      if (label) label.hidden = true;
      canvas.classList.remove('is-hot');
      return;
    }

    setObjectGlow(nextId,true);
    const meta = projectMap[nextId];
    if (label && meta) {
      label.hidden = false;
      labelType.textContent = meta.type;
      labelTitle.textContent = meta.title;
      if (event) {
        label.style.setProperty('--label-x', Math.min(window.innerWidth - 240, event.clientX + 18) + 'px');
        label.style.setProperty('--label-y', Math.min(window.innerHeight - 100, event.clientY + 18) + 'px');
      }
    }
    canvas.classList.add('is-hot');
  }

  function pointerToRay(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer,camera);
    return raycaster.intersectObjects(hotspotMeshes,true);
  }

  function bindInteractions() {
    enterButton?.addEventListener('click', enterLab);

    section.addEventListener('pointermove', event => {
      const rect = section.getBoundingClientRect();
      parallax.x = ((event.clientX - rect.left) / rect.width - .5) * 2;
      parallax.y = ((event.clientY - rect.top) / rect.height - .5) * -2;
      if (!exploring || coarse || !raycaster) return;
      const hit = findHotspot(pointerToRay(event));
      setHovered(hit,event);
    });

    section.addEventListener('pointerleave', () => {
      parallax.x = 0;
      parallax.y = 0;
      setHovered(null);
    });

    canvas.addEventListener('click', event => {
      if (!exploring || !raycaster) return;
      const hit = findHotspot(pointerToRay(event));
      const id = hit?.userData?.hotspot;
      if (id && projectMap[id]) window.location.href = projectMap[id].href;
    });

    listLinks.forEach(link => {
      const id = link.dataset.labHotspot;
      link.addEventListener('mouseenter', () => setObjectGlow(id,true));
      link.addEventListener('mouseleave', () => setObjectGlow(id,false));
      link.addEventListener('focus', () => setObjectGlow(id,true));
      link.addEventListener('blur', () => setObjectGlow(id,false));
    });

    window.addEventListener('resize', resize, {passive:true});

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
      }, {threshold:.01});
      observer.observe(section);
    }
  }

  async function init() {
    try {
      three = await import(THREE_URL);
      buildScene();
      bindInteractions();
      if (loader) {
        loader.classList.add('is-complete');
        window.setTimeout(() => loader.hidden = true, reduced ? 0 : 420);
      }
      entry?.classList.add('is-ready');
      renderLoop();
    } catch (error) {
      console.warn('Interactive workbench unavailable:', error);
      showFallback();
    }
  }

  init();
})();
