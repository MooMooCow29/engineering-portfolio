(() => {
  const section = document.getElementById('lab');
  const canvas = document.getElementById('lab-canvas');
  if (!section || !canvas) return;

  const data = window.PORTFOLIO_DATA || { projects: [] };
  const entry = section.querySelector('[data-lab-entry]');
  const exploreUi = section.querySelector('[data-lab-explore]');
  const enterButton = section.querySelector('[data-lab-enter]');
  const loader = section.querySelector('[data-lab-loader]');
  const loaderLabel = section.querySelector('[data-lab-loader-label]');
  const progressBar = section.querySelector('[data-lab-progress]');
  const progressNumber = section.querySelector('[data-lab-progress-number]');
  const label = section.querySelector('[data-lab-label]');
  const labelType = section.querySelector('[data-lab-label-type]');
  const labelTitle = section.querySelector('[data-lab-label-title]');
  const projectPanel = section.querySelector('[data-lab-project]');
  const projectType = section.querySelector('[data-lab-project-type]');
  const projectNumber = section.querySelector('[data-lab-project-number]');
  const projectTitle = section.querySelector('[data-lab-project-title]');
  const projectSubtitle = section.querySelector('[data-lab-project-subtitle]');
  const projectSummary = section.querySelector('[data-lab-project-summary]');
  const projectTags = section.querySelector('[data-lab-project-tags]');
  const projectSignal = section.querySelector('[data-lab-project-signal]');
  const projectLink = section.querySelector('[data-lab-project-link]');
  const closeButtons = [...section.querySelectorAll('[data-lab-close],[data-lab-back]')];
  const camReadout = section.querySelector('[data-lab-cam]');
  const fpsReadout = section.querySelector('[data-lab-fps]');
  const modeReadout = section.querySelector('[data-lab-mode]');
  const listLinks = [...section.querySelectorAll('[data-lab-hotspot]')];

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer:coarse)').matches;
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
  const GSAP_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';

  let THREE;
  let gsap;
  let renderer;
  let scene;
  let camera;
  let raycaster;
  let pointerNdc;
  let clock;
  let raf = 0;
  let visible = true;
  let exploring = false;
  let focusedId = '';
  let hovered = null;
  let dragging = false;
  let dragStart = null;
  let frameCounter = 0;
  let fpsLast = performance.now();
  let lastPointerEvent = null;

  const hotspots = [];
  const hotspotGroups = new Map();
  const animated = {
    wheels: [],
    leds: [],
    fans: [],
    steam: [],
    scopeTexture: null,
    scopeCanvas: null,
    scopeCtx: null,
    monitorTexture: null,
    monitorCanvas: null,
    monitorCtx: null,
    epaperMaterial: null,
    lampLight: null,
    accentLight: null,
    coolLight: null,
    dust: null
  };

  const view = {
    yaw: 0,
    pitch: 0,
    zoom: 0,
    targetYaw: 0,
    targetPitch: 0,
    targetZoom: 0,
    pointerX: 0,
    pointerY: 0
  };

  const overview = {
    position: [0, 2.75, 6.35],
    target: [0, .48, -.08]
  };

  const projectMap = {
    scope:   { number:'01', type:'OSCILLOSCOPE',        title:'pySignalScope',                    projectId:'pysignalscope',                    href:'projects/pysignalscope/',                    camera:[3.25,1.55,.65],   target:[2.55,.67,-.82] },
    pcb:     { number:'02', type:'CONTROLLER PCB',      title:'Advanced 2WD Robot Controller',   projectId:'advanced-2wd-robot-controller',   href:'projects/advanced-2wd-robot-controller/',   camera:[-3.45,1.40,.55], target:[-2.72,.34,-.85] },
    robot:   { number:'03', type:'ROBOT PLATFORM',      title:'Obstacle Avoidance Robot',         projectId:'obstacle-avoidance-robot',         href:'projects/obstacle-avoidance-robot/',         camera:[-3.55,1.28,2.55],target:[-2.30,.38,1.14] },
    epaper:  { number:'04', type:'E-PAPER RESEARCH',    title:'Batteryless ePaper Research',      projectId:'energy-harvesting-epaper',         href:'projects/energy-harvesting-epaper/',         camera:[3.55,1.18,2.38], target:[2.75,.20,1.12] },
    aurora:  { number:'05', type:'AVIONICS CONSOLE',    title:'AURORA-VX',                        projectId:'aurora-vx',                        href:'projects/aurora-vx/',                        camera:[2.65,2.15,2.25], target:[1.95,1.30,.45] },
    formula: { number:'06', type:'VEHICLE ELECTRONICS', title:'Formula Student Electrical Systems',projectId:'formula-student-electrical',        href:'projects/formula-student-electrical/',        camera:[1.65,1.15,.70],  target:[.55,.33,-1.20] }
  };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a,b,t) => a + (b-a)*t;

  function projectFor(id) {
    const cfg = projectMap[id];
    if (!cfg) return null;
    return data.projects.find(p => p.id === cfg.projectId) || null;
  }

  function updateProgress(value, text) {
    const v = clamp(Math.round(value), 0, 100);
    if (progressBar) progressBar.style.width = v + '%';
    if (progressNumber) progressNumber.textContent = String(v).padStart(2,'0') + '%';
    if (loaderLabel && text) loaderLabel.textContent = text;
  }

  function showFallback() {
    section.classList.add('lab-no-webgl');
    document.body.classList.add('lab-visible');
    updateProgress(100, 'STANDARD MODE READY');
    if (loader) loader.hidden = true;
    if (entry) entry.classList.add('is-ready');
    listLinks.forEach(link => {
      link.addEventListener('click', () => {});
    });
  }

  function canvasTexture(lines, opts = {}) {
    const c = document.createElement('canvas');
    c.width = opts.width || 1024;
    c.height = opts.height || 512;
    const ctx = c.getContext('2d');
    const bg = opts.bg || '#0a0d12';
    const fg = opts.fg || '#f2efe8';
    const accent = opts.accent || '#ff6b3d';

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,c.width,c.height);
    ctx.strokeStyle = opts.grid || 'rgba(255,255,255,.055)';
    ctx.lineWidth = 1;
    for (let x=0;x<c.width;x+=48){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,c.height);ctx.stroke();}
    for (let y=0;y<c.height;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(c.width,y);ctx.stroke();}

    ctx.fillStyle = accent;
    ctx.font = '700 22px monospace';
    ctx.fillText(opts.kicker || 'ENGINEERING PORTFOLIO', 48, 58);

    ctx.fillStyle = fg;
    ctx.font = '800 56px Arial, sans-serif';
    let y = 135;
    lines.forEach(line => { ctx.fillText(line,48,y); y += 68; });

    if (opts.footer) {
      ctx.fillStyle = 'rgba(242,239,232,.56)';
      ctx.font = '18px monospace';
      ctx.fillText(opts.footer,48,c.height-40);
    }

    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return { texture, canvas:c, ctx };
  }

  function material(color, roughness=.64, metalness=.12) {
    return new THREE.MeshStandardMaterial({color,roughness,metalness});
  }

  function register(mesh, id) {
    const cfg = projectMap[id];
    if (!cfg) return;
    mesh.userData.hotspot = id;
    mesh.userData.meta = cfg;
    hotspots.push(mesh);
    if (!hotspotGroups.has(id)) hotspotGroups.set(id,[]);
    hotspotGroups.get(id).push(mesh);
  }

  function setGlow(id,on) {
    const objects = hotspotGroups.get(id) || [];
    objects.forEach(obj => {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(mat => {
        if (!mat || !('emissive' in mat)) return;
        if (!mat.userData.__baseEmissive) {
          mat.userData.__baseEmissive = mat.emissive.clone();
          mat.userData.__baseIntensity = mat.emissiveIntensity || 0;
        }
        if (on) {
          mat.emissive.set('#ff6b3d');
          mat.emissiveIntensity = .62;
        } else {
          mat.emissive.copy(mat.userData.__baseEmissive);
          mat.emissiveIntensity = mat.userData.__baseIntensity;
        }
      });
    });
  }

  function addDesk() {
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(8.9,.22,4.9),
      material('#5c4130',.72,.04)
    );
    top.position.y = 0;
    top.receiveShadow = true;
    scene.add(top);

    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(9.02,.08,5.02),
      material('#2d211a',.45,.14)
    );
    edge.position.y = -.14;
    scene.add(edge);

    const legMat = material('#11141a',.38,.66);
    const legGeo = new THREE.BoxGeometry(.24,2.8,.24);
    [[-3.85,-1.65],[3.85,-1.65],[-3.85,1.65],[3.85,1.65]].forEach(([x,z])=>{
      const leg = new THREE.Mesh(legGeo,legMat);
      leg.position.set(x,-1.45,z); leg.castShadow=true; scene.add(leg);
    });

    const tray = new THREE.Mesh(new THREE.BoxGeometry(6.9,.12,.58),legMat);
    tray.position.set(0,-.48,1.62); scene.add(tray);
  }

  function drawMainMonitor(projectId='') {
    if (!animated.monitorCtx || !animated.monitorTexture) return;
    const ctx = animated.monitorCtx;
    const c = animated.monitorCanvas;
    const w=c.width,h=c.height;
    ctx.fillStyle='#080b10'; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(119,149,205,.09)';
    for(let x=0;x<w;x+=56){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=0;y<h;y+=56){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}

    const p = data.projects.find(x=>x.id===projectId);
    ctx.fillStyle='#ff6b3d'; ctx.font='700 24px monospace';
    ctx.fillText(p ? 'PROJECT FOCUS / ' + (p.category || '').toUpperCase() : 'KARANVEER SINGH / ENGINEERING PORTFOLIO',50,62);

    ctx.fillStyle='#f2efe8';
    ctx.font='800 58px Arial, sans-serif';
    const title = p ? p.title.toUpperCase() : 'ENGINEERING WORKBENCH';
    const words = title.split(' ');
    let line='',y=145;
    for(const word of words){
      const test=line ? line+' '+word : word;
      if(ctx.measureText(test).width>980 && line){ctx.fillText(line,50,y);line=word;y+=68;}
      else line=test;
    }
    if(line) ctx.fillText(line,50,y);

    ctx.fillStyle='rgba(242,239,232,.62)';
    ctx.font='19px monospace';
    const footer = p ? 'SELECTED SYSTEM / OPEN CASE STUDY FOR FULL EVIDENCE' : 'CLICK AN ENGINEERING OBJECT TO INSPECT';
    ctx.fillText(footer,50,h-48);

    animated.monitorTexture.needsUpdate=true;
  }

  function addMonitor() {
    const group = new THREE.Group();
    group.position.set(-.35,1.50,.46);
    scene.add(group);

    const frameMat = material('#10131a',.32,.58);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(3.35,2.08,.18),frameMat);
    frame.castShadow=true; group.add(frame);

    const c = document.createElement('canvas');
    c.width=1200;c.height=720;
    animated.monitorCanvas=c;
    animated.monitorCtx=c.getContext('2d');
    animated.monitorTexture=new THREE.CanvasTexture(c);
    animated.monitorTexture.colorSpace=THREE.SRGBColorSpace;
    drawMainMonitor();

    const screenMat = new THREE.MeshStandardMaterial({
      map:animated.monitorTexture,
      emissive:'#18243a',
      emissiveIntensity:.42,
      roughness:.28
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.06,1.79),screenMat);
    screen.position.z=.101; group.add(screen);

    const neck = new THREE.Mesh(new THREE.BoxGeometry(.18,.80,.16),frameMat);
    neck.position.y=-1.39; group.add(neck);
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.28,.12,.74),frameMat);
    base.position.set(0,-1.80,.20); group.add(base);

    const auxFrame = new THREE.Mesh(new THREE.BoxGeometry(1.64,.90,.12),frameMat);
    auxFrame.position.set(2.35,-.18,.03); auxFrame.rotation.y=-.08; group.add(auxFrame);

    const aur = canvasTexture(['AURORA-VX','ASSURANCE'],{
      width:680,height:300,kicker:'AVIONICS / DIGITAL TWIN',footer:'TRACEABLE VERIFICATION'
    });
    const auxMat = new THREE.MeshStandardMaterial({map:aur.texture,emissive:'#17243b',emissiveIntensity:.52,roughness:.28});
    const auxScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.47,.72),auxMat);
    auxScreen.position.set(2.35,-.18,.095);auxScreen.rotation.y=-.08;group.add(auxScreen);
    register(auxScreen,'aurora');

    const ledMat = new THREE.MeshStandardMaterial({color:'#46f48b',emissive:'#46f48b',emissiveIntensity:1.4});
    const led = new THREE.Mesh(new THREE.SphereGeometry(.025,12,12),ledMat);
    led.position.set(-1.48,-.89,.12);group.add(led);animated.leds.push({mesh:led,phase:.3});
  }

  function addScope() {
    const group=new THREE.Group();
    group.position.set(2.55,.66,-.86);group.rotation.y=-.22;scene.add(group);
    const bodyMat=material('#d1d3d6',.50,.30);
    const darkMat=material('#151820',.38,.62);
    const body=new THREE.Mesh(new THREE.BoxGeometry(2.18,1.32,1.42),bodyMat);
    body.castShadow=true;group.add(body);

    const c=document.createElement('canvas');c.width=720;c.height=360;
    animated.scopeCanvas=c;animated.scopeCtx=c.getContext('2d');
    animated.scopeTexture=new THREE.CanvasTexture(c);animated.scopeTexture.colorSpace=THREE.SRGBColorSpace;
    const screenMat=new THREE.MeshStandardMaterial({map:animated.scopeTexture,emissive:'#0d3518',emissiveIntensity:.78,roughness:.26});
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(1.28,.80),screenMat);
    screen.position.set(-.29,.13,.716);group.add(screen);register(screen,'scope');

    for(let i=0;i<8;i++){
      const knob=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.09,24),darkMat);
      knob.rotation.x=Math.PI/2;
      knob.position.set(.73+(i%2)*.28,.39-Math.floor(i/2)*.24,.748);
      group.add(knob);
    }

    const topHandle=new THREE.Mesh(new THREE.TorusGeometry(.62,.035,8,28,Math.PI),darkMat);
    topHandle.rotation.z=Math.PI;topHandle.position.set(0,.72,0);group.add(topHandle);
  }

  function updateScope(t) {
    const ctx=animated.scopeCtx,c=animated.scopeCanvas,tex=animated.scopeTexture;
    if(!ctx||!c||!tex)return;
    const w=c.width,h=c.height;
    ctx.fillStyle='#07110c';ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(111,255,140,.105)';
    ctx.lineWidth=1;
    for(let x=0;x<w;x+=45){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=0;y<h;y+=45){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}

    const sweep=((t*.19)%w);
    ctx.strokeStyle='#76ff8b';ctx.lineWidth=4;ctx.beginPath();
    for(let x=0;x<w;x+=4){
      const ph=x*.025+t*.002;
      let y=h*.48+Math.sin(ph)*80+Math.sin(ph*3.2)*11;
      if((x>230&&x<255)||(x>500&&x<522)) y-=48*Math.exp(-Math.pow((x%260)-245,2)/120);
      if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }ctx.stroke();
    ctx.strokeStyle='rgba(180,255,190,.32)';ctx.beginPath();ctx.moveTo(sweep,0);ctx.lineTo(sweep,h);ctx.stroke();
    ctx.fillStyle='#9fffb0';ctx.font='700 16px monospace';
    ctx.fillText('CH1  112.4 kHz',24,30);ctx.fillText('5.00 V/div   2.00 µs/div',24,h-22);
    tex.needsUpdate=true;
  }

  function addPCB() {
    const group=new THREE.Group();
    group.position.set(-2.76,.31,-.91);group.rotation.y=.18;scene.add(group);
    const boardMat=material('#173b2c',.53,.20);
    const board=new THREE.Mesh(new THREE.BoxGeometry(2.18,.09,1.58),boardMat);
    board.castShadow=true;group.add(board);register(board,'pcb');

    const chipMat=material('#101116',.48,.28);
    const copper=material('#d59d5b',.28,.68);
    for(let i=0;i<6;i++){
      const chip=new THREE.Mesh(new THREE.BoxGeometry(.24+(i%2)*.22,.13,.30+((i+1)%2)*.18),chipMat);
      chip.position.set(-.78+i*.31,.11,-.15+(i%2)*.42);group.add(chip);
    }
    for(let i=0;i<24;i++){
      const via=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,.026,12),copper);
      via.position.set(-.96+(i%12)*.17,.064,-.65+Math.floor(i/12)*1.30);group.add(via);
    }
    const traceMat=new THREE.MeshBasicMaterial({color:'#c48647'});
    for(let i=0;i<7;i++){
      const trace=new THREE.Mesh(new THREE.BoxGeometry(.93-i*.06,.008,.018),traceMat);
      trace.position.set(-.18+i*.07,.052,-.53+i*.17);group.add(trace);
    }
    for(let i=0;i<3;i++){
      const ledMat=new THREE.MeshStandardMaterial({color:i===1?'#ff6b3d':'#55d985',emissive:i===1?'#ff6b3d':'#55d985',emissiveIntensity:1.1});
      const led=new THREE.Mesh(new THREE.SphereGeometry(.035,12,12),ledMat);
      led.position.set(.70-i*.22,.13,.58);group.add(led);animated.leds.push({mesh:led,phase:i*.8});
    }
  }

  function addRobot() {
    const group=new THREE.Group();
    group.position.set(-2.35,.36,1.22);group.rotation.y=.12;scene.add(group);
    const chassis=new THREE.Mesh(new THREE.BoxGeometry(1.80,.13,1.22),material('#5b432e',.74,.04));
    chassis.castShadow=true;group.add(chassis);register(chassis,'robot');

    const wheelMat=material('#151515',.72,.12);
    const hubMat=material('#e4bc2d',.62,.08);
    [-.96,.96].forEach(x=>{
      [-.40,.40].forEach(z=>{
        if(z>.01)return;
        const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.22,30),wheelMat);
        wheel.rotation.z=Math.PI/2;wheel.position.set(x,-.06,z);group.add(wheel);animated.wheels.push(wheel);
        const hub=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.23,30),hubMat);
        hub.rotation.z=Math.PI/2;hub.position.copy(wheel.position);group.add(hub);
      });
    });

    const sensorBar=new THREE.Mesh(new THREE.BoxGeometry(.66,.18,.10),material('#17345b',.48,.25));
    sensorBar.position.set(0,.22,-.59);group.add(sensorBar);
    const sensorMat=material('#626a71',.31,.64);
    [-.20,.20].forEach(x=>{
      const can=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.12,28),sensorMat);
      can.rotation.x=Math.PI/2;can.position.set(x,.22,-.66);group.add(can);
    });
  }

  function addEPaper() {
    const group=new THREE.Group();
    group.position.set(2.78,.16,1.17);group.rotation.set(-.08,-.22,0);scene.add(group);
    const frame=new THREE.Mesh(new THREE.BoxGeometry(1.58,.09,1.08),material('#24272d',.46,.36));
    frame.castShadow=true;group.add(frame);

    const t=canvasTexture(['BATTERYLESS','E-PAPER'],{
      width:720,height:450,bg:'#e9e7df',fg:'#101217',accent:'#e8552d',grid:'rgba(0,0,0,.035)',
      kicker:'ENERGY HARVESTING',footer:'NO BATTERY / UPDATE ON HARVESTED ENERGY'
    });
    const mat=new THREE.MeshStandardMaterial({map:t.texture,roughness:.95,emissive:'#ffffff',emissiveIntensity:0});
    animated.epaperMaterial=mat;
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(1.40,.90),mat);
    screen.rotation.x=-Math.PI/2;screen.position.y=.049;group.add(screen);register(screen,'epaper');
  }

  function addFormulaModule() {
    const group=new THREE.Group();
    group.position.set(.55,.29,-1.28);group.rotation.y=-.06;scene.add(group);
    const box=new THREE.Mesh(new THREE.BoxGeometry(1.32,.40,.75),material('#111318',.31,.64));
    box.castShadow=true;group.add(box);register(box,'formula');

    const t=canvasTexture(['FS ELECTRICAL'],{
      width:600,height:220,bg:'#12151a',fg:'#f2efe8',accent:'#ff6b3d',
      kicker:'UEA FORMULA STUDENT',footer:'CAN / LV / SAFETY'
    });
    const plate=new THREE.Mesh(new THREE.PlaneGeometry(1.08,.29),new THREE.MeshStandardMaterial({map:t.texture,emissive:'#171717',emissiveIntensity:.12}));
    plate.rotation.x=-Math.PI/2;plate.position.y=.205;group.add(plate);

    for(let i=0;i<5;i++){
      const term=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,.16,16),material(i%2?'#b53e32':'#2d3239',.40,.52));
      term.position.set(-.43+i*.215,.09,-.44);group.add(term);
    }
    for(let i=0;i<3;i++){
      const lm=new THREE.MeshStandardMaterial({color:i===0?'#5be190':'#ff9b52',emissive:i===0?'#5be190':'#ff9b52',emissiveIntensity:1.2});
      const led=new THREE.Mesh(new THREE.SphereGeometry(.028,12,12),lm);
      led.position.set(.36-i*.18,.23,.24);group.add(led);animated.leds.push({mesh:led,phase:1.2+i*.7});
    }
  }

  function addKeyboardAndMouse() {
    const keyMat=material('#1b1e24',.46,.35);
    const board=new THREE.Mesh(new THREE.BoxGeometry(2.15,.08,.72),material('#252a31',.5,.34));
    board.position.set(.05,.18,1.44);board.rotation.y=.035;scene.add(board);
    for(let row=0;row<4;row++){
      for(let col=0;col<11;col++){
        const key=new THREE.Mesh(new THREE.BoxGeometry(.13,.035,.10),keyMat);
        key.position.set(-.79+col*.155,.235,1.22+row*.135);
        key.rotation.y=.035;scene.add(key);
      }
    }
    const mouse=new THREE.Mesh(new THREE.SphereGeometry(.19,20,16,0,Math.PI*2,0,Math.PI/1.8),material('#252a31',.42,.38));
    mouse.scale.set(.85,.48,1.35);mouse.position.set(1.58,.20,1.48);scene.add(mouse);
  }

  function addNotebook() {
    const paper=material('#d8d2c4',.92,.01);
    const book=new THREE.Mesh(new THREE.BoxGeometry(1.15,.035,.90),paper);
    book.position.set(-.15,.15,-1.68);book.rotation.y=-.04;scene.add(book);
    for(let i=0;i<7;i++){
      const line=new THREE.Mesh(new THREE.BoxGeometry(.78,.002,.008),new THREE.MeshBasicMaterial({color:'#7a746c'}));
      line.position.set(-.18,.170,-1.93+i*.10);line.rotation.y=-.04;scene.add(line);
    }
    const pen=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.80,12),material('#d45e3d',.38,.3));
    pen.rotation.z=Math.PI/2;pen.rotation.y=.25;pen.position.set(.38,.22,-1.47);scene.add(pen);
  }

  function addCables() {
    const cableDefs = [
      {points:[[-2.6,.20,-.35],[-1.7,.32,.10],[-.9,.18,.58],[-.1,.14,1.15]],color:'#2da16a'},
      {points:[[2.5,.22,-.28],[1.85,.36,.18],[1.2,.18,.65],[.55,.14,1.08]],color:'#d6573a'},
      {points:[[.65,.18,-1.05],[.95,.24,-.45],[1.3,.14,.22],[1.45,.12,1.10]],color:'#d5b647'}
    ];
    cableDefs.forEach(def=>{
      const pts=def.points.map(p=>new THREE.Vector3(...p));
      const curve=new THREE.CatmullRomCurve3(pts);
      const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,50,.018,8,false),material(def.color,.55,.08));
      scene.add(mesh);
    });
  }

  function addMultimeter() {
    const g=new THREE.Group();g.position.set(3.70,.30,-1.55);g.rotation.y=-.18;scene.add(g);
    const body=new THREE.Mesh(new THREE.BoxGeometry(.82,.18,1.15),material('#e2b536',.58,.12));
    body.castShadow=true;g.add(body);
    const display=canvasTexture(['12.08 V'],{width:500,height:220,bg:'#20261e',fg:'#9bff95',accent:'#9bff95',kicker:'DMM',footer:'DC'});
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(.56,.23),new THREE.MeshStandardMaterial({map:display.texture,emissive:'#18311d',emissiveIntensity:.4}));
    screen.rotation.x=-Math.PI/2;screen.position.set(0,.10,-.26);g.add(screen);
    const dial=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.06,28),material('#26282a',.55,.35));
    dial.position.set(0,.12,.24);g.add(dial);
  }

  function addEnvironment() {
    const wall=new THREE.Mesh(new THREE.PlaneGeometry(18,10),material('#0e1117',.95,0));
    wall.position.set(0,2.4,-3.25);scene.add(wall);
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(18,18),material('#090b0f',.95,0));
    floor.rotation.x=-Math.PI/2;floor.position.y=-2.82;floor.receiveShadow=true;scene.add(floor);

    const shelfMat=material('#151922',.40,.64);
    const shelf=new THREE.Mesh(new THREE.BoxGeometry(7.7,.12,.55),shelfMat);
    shelf.position.set(0,3.04,-2.88);scene.add(shelf);

    for(let i=0;i<5;i++){
      const inst=new THREE.Mesh(new THREE.BoxGeometry(.90,.44,.48),material(i%2?'#c8c9c7':'#272a31',.50,.32));
      inst.position.set(-2.75+i*1.38,3.33,-2.72);scene.add(inst);
      const face=new THREE.Mesh(new THREE.PlaneGeometry(.55,.18),new THREE.MeshBasicMaterial({color:i%2?'#2c343d':'#0d1117'}));
      face.position.set(inst.position.x,3.34,-2.475);scene.add(face);
    }

    const lampMat=material('#242830',.30,.68);
    const stem=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,1.65,16),lampMat);
    stem.position.set(3.96,.88,1.65);scene.add(stem);
    const head=new THREE.Mesh(new THREE.ConeGeometry(.34,.50,24,1,true),lampMat);
    head.rotation.z=Math.PI;head.position.set(3.96,1.73,1.65);scene.add(head);

    animated.lampLight=new THREE.PointLight('#ffd0a3',0,5.8,1.7);
    animated.lampLight.position.set(3.96,1.45,1.65);animated.lampLight.castShadow=!coarse;scene.add(animated.lampLight);

    const cup=new THREE.Mesh(new THREE.CylinderGeometry(.22,.18,.36,24),material('#d8d4ca',.7,.08));
    cup.position.set(-3.75,.34,1.55);scene.add(cup);
    const coffee=new THREE.Mesh(new THREE.CircleGeometry(.17,24),new THREE.MeshBasicMaterial({color:'#2c160c'}));
    coffee.rotation.x=-Math.PI/2;coffee.position.set(-3.75,.526,1.55);scene.add(coffee);

    for(let i=0;i<12;i++){
      const dot=new THREE.Mesh(new THREE.SphereGeometry(.012,8,8),new THREE.MeshBasicMaterial({color:'#d8d4ca',transparent:true,opacity:.18}));
      dot.userData.baseX=-3.75+(Math.random()-.5)*.12;
      dot.userData.baseZ=1.55+(Math.random()-.5)*.12;
      dot.userData.phase=Math.random()*Math.PI*2;
      dot.position.set(dot.userData.baseX,.56+Math.random()*.65,dot.userData.baseZ);
      scene.add(dot);animated.steam.push(dot);
    }

    const dustGeo=new THREE.BufferGeometry();
    const count=180;
    const arr=new Float32Array(count*3);
    for(let i=0;i<count;i++){
      arr[i*3]=(Math.random()-.5)*10;
      arr[i*3+1]=Math.random()*6-1.5;
      arr[i*3+2]=(Math.random()-.5)*7-1;
    }
    dustGeo.setAttribute('position',new THREE.BufferAttribute(arr,3));
    animated.dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:'#d6d3ca',size:.012,transparent:true,opacity:.20,depthWrite:false}));
    scene.add(animated.dust);
  }

  function buildScene() {
    scene=new THREE.Scene();
    scene.background=new THREE.Color('#090b0f');
    scene.fog=new THREE.FogExp2('#090b0f',.052);

    camera=new THREE.PerspectiveCamera(42,1,.1,50);
    camera.position.set(0,4.9,10.5);

    renderer=new THREE.WebGLRenderer({canvas,antialias:!coarse,alpha:false,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,coarse?1.2:1.65));
    renderer.shadowMap.enabled=!coarse;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.02;

    raycaster=new THREE.Raycaster();
    pointerNdc=new THREE.Vector2(2,2);
    clock=new THREE.Clock();

    scene.add(new THREE.HemisphereLight('#7087bb','#160d08',.82));
    const key=new THREE.DirectionalLight('#dce7ff',2.35);
    key.position.set(-4,7,5);key.castShadow=!coarse;key.shadow.mapSize.set(coarse?512:1024,coarse?512:1024);scene.add(key);

    animated.accentLight=new THREE.PointLight('#ff5e39',0,8,2);
    animated.accentLight.position.set(-4.3,2.5,-1.2);scene.add(animated.accentLight);
    animated.coolLight=new THREE.PointLight('#647cff',0,7.5,2);
    animated.coolLight.position.set(4.2,3,-1.8);scene.add(animated.coolLight);

    addDesk();
    addEnvironment();
    addMonitor();
    addScope();
    addPCB();
    addRobot();
    addEPaper();
    addFormulaModule();
    addKeyboardAndMouse();
    addNotebook();
    addCables();
    addMultimeter();

    resize();
  }

  function resize() {
    if(!renderer||!camera)return;
    const rect=canvas.getBoundingClientRect();
    const w=Math.max(1,rect.width),h=Math.max(1,rect.height);
    renderer.setSize(w,h,false);
    camera.aspect=w/h;camera.updateProjectionMatrix();
  }

  function introSequence() {
    if (!gsap || reduced) {
      camera.position.fromArray(overview.position);
      camera.lookAt(new THREE.Vector3(...overview.target));
      if (animated.lampLight) animated.lampLight.intensity=20;
      if (animated.accentLight) animated.accentLight.intensity=22;
      if (animated.coolLight) animated.coolLight.intensity=16;
      entry?.classList.add('is-ready');
      if(loader) loader.hidden=true;
      return;
    }

    const target=new THREE.Vector3(...overview.target);
    const state={tx:target.x,ty:target.y,tz:target.z};
    camera.lookAt(target);

    gsap.timeline()
      .to(animated.lampLight,{intensity:20,duration:.55,ease:'power2.out'},0)
      .to(animated.accentLight,{intensity:22,duration:.75,ease:'power2.out'},.12)
      .to(animated.coolLight,{intensity:16,duration:.75,ease:'power2.out'},.18)
      .to(camera.position,{x:0,y:3.65,z:8.6,duration:1.55,ease:'power3.inOut',
        onUpdate:()=>camera.lookAt(state.tx,state.ty,state.tz)},.12)
      .to(camera.position,{x:0,y:3.20,z:7.65,duration:1.0,ease:'power2.inOut',
        onUpdate:()=>camera.lookAt(state.tx,state.ty,state.tz)},1.32)
      .add(()=>entry?.classList.add('is-ready'),1.35)
      .add(()=>{if(loader){loader.classList.add('is-complete');setTimeout(()=>loader.hidden=true,360);}},1.50);
  }

  function updateAmbient(t,dt) {
    if(animated.scopeTexture && !reduced) updateScope(t);

    animated.wheels.forEach((wheel,i)=>{
      wheel.rotation.x += dt*(.10+i*.01);
    });

    animated.leds.forEach((item,i)=>{
      const pulse=.48+.52*Math.max(0,Math.sin(t*.0027+item.phase+i*.5));
      item.mesh.material.emissiveIntensity=.45+pulse*1.65;
    });

    animated.steam.forEach((dot,i)=>{
      const speed=.00015+(i%4)*.000018;
      const y=.58+((t*speed+i*.081)%1)*.82;
      dot.position.y=y;
      dot.position.x=dot.userData.baseX+Math.sin(t*.0016+dot.userData.phase)*.045;
      dot.position.z=dot.userData.baseZ+Math.cos(t*.0012+dot.userData.phase)*.035;
      dot.material.opacity=.24*(1-(y-.58)/.82);
    });

    if(animated.dust && !reduced){
      animated.dust.rotation.y += dt*.006;
      animated.dust.position.y=Math.sin(t*.00013)*.08;
    }
  }

  function updateOverviewCamera(dt) {
    if(!exploring || focusedId) return;
    const f=1-Math.pow(.0005,dt);
    view.yaw=lerp(view.yaw,view.targetYaw,f);
    view.pitch=lerp(view.pitch,view.targetPitch,f);
    view.zoom=lerp(view.zoom,view.targetZoom,f);

    const target=new THREE.Vector3(...overview.target);
    const radius=6.1+view.zoom;
    const baseAngle=Math.PI/2;
    const angle=baseAngle+view.yaw;
    const elevation=.36+view.pitch;
    const x=target.x+Math.cos(angle)*radius;
    const z=target.z+Math.sin(angle)*radius;
    const y=target.y+Math.sin(elevation)*radius*.57+1.00;
    camera.position.lerp(new THREE.Vector3(x,y,z),1-Math.pow(.0002,dt));
    camera.lookAt(target.x+view.pointerX*.10,target.y+view.pointerY*.06,target.z);
  }

  function renderLoop() {
    if(!renderer||!scene||!camera)return;
    const dt=Math.min(clock.getDelta(),.05);
    const t=performance.now();
    if(visible){
      updateAmbient(t,dt);
      updateOverviewCamera(dt);
      renderer.render(scene,camera);
      frameCounter++;
      if(t-fpsLast>700){
        if(fpsReadout)fpsReadout.textContent=String(Math.round(frameCounter*1000/(t-fpsLast)));
        frameCounter=0;fpsLast=t;
      }
    }
    raf=requestAnimationFrame(renderLoop);
  }

  function enterLab() {
    if(exploring)return;
    exploring=true;
    section.classList.add('is-exploring');
    document.body.classList.add('lab-exploring');
    entry?.classList.add('is-exiting');
    if(modeReadout)modeReadout.textContent='EXPLORE';

    const finish=()=>{
      if(entry)entry.hidden=true;
      if(exploreUi){exploreUi.hidden=false;exploreUi.classList.add('is-visible');}
    };
    setTimeout(finish,reduced?0:380);

    if(gsap&&!reduced){
      const target={...{x:overview.target[0],y:overview.target[1],z:overview.target[2]}};
      gsap.to(camera.position,{x:overview.position[0],y:overview.position[1],z:overview.position[2],duration:1.45,ease:'power3.inOut',
        onUpdate:()=>camera.lookAt(target.x,target.y,target.z)});
    } else {
      camera.position.fromArray(overview.position);camera.lookAt(new THREE.Vector3(...overview.target));
    }
  }

  function findHotspot(intersections) {
    for(const hit of intersections){
      let obj=hit.object;
      while(obj){
        if(obj.userData&&obj.userData.hotspot)return obj;
        obj=obj.parent;
      }
    }
    return null;
  }

  function raycast(event) {
    if(!raycaster||!camera)return[];
    const rect=canvas.getBoundingClientRect();
    pointerNdc.x=((event.clientX-rect.left)/rect.width)*2-1;
    pointerNdc.y=-((event.clientY-rect.top)/rect.height)*2+1;
    raycaster.setFromCamera(pointerNdc,camera);
    return raycaster.intersectObjects(hotspots,true);
  }

  function setHovered(next,event) {
    const nextId=next?.userData?.hotspot||'';
    const prevId=hovered?.userData?.hotspot||'';
    if(prevId&&prevId!==nextId&&!focusedId)setGlow(prevId,false);
    hovered=next||null;

    if(!nextId||focusedId){
      if(label)label.hidden=true;
      canvas.classList.remove('is-hot');
      return;
    }
    setGlow(nextId,true);
    const cfg=projectMap[nextId];
    if(label&&cfg){
      label.hidden=false;
      labelType.textContent=cfg.type;
      labelTitle.textContent=cfg.title;
      if(event){
        label.style.setProperty('--label-x',Math.min(window.innerWidth-250,event.clientX+18)+'px');
        label.style.setProperty('--label-y',Math.min(window.innerHeight-110,event.clientY+18)+'px');
      }
    }
    canvas.classList.add('is-hot');
  }

  function engineeringSignal(project,cfg) {
    if(project?.verification?.length){
      const v=project.verification[0];
      return (v.result||'') + (v.metric ? ' · ' + v.metric : '');
    }
    if(project?.status) return project.status;
    if(project?.year) return project.year + ' · ' + cfg.type;
    return cfg.type;
  }

  function populateProjectPanel(id) {
    const cfg=projectMap[id];
    const project=projectFor(id);
    if(!cfg)return;

    projectType.textContent=cfg.type;
    projectNumber.textContent=cfg.number;
    projectTitle.textContent=project?.title||cfg.title;
    projectSubtitle.textContent=project?.subtitle||'Interactive engineering project';
    projectSummary.textContent=project?.summary||'Open the case study to inspect the engineering evidence.';
    projectSignal.textContent=engineeringSignal(project,cfg);
    projectLink.href=cfg.href;
    projectTags.innerHTML=(project?.skills||[]).slice(0,5).map(s=>'<span>'+s+'</span>').join('');
  }

  function focusProject(id) {
    const cfg=projectMap[id];
    if(!cfg||!exploring)return;
    if(focusedId===id)return;
    if(focusedId)setGlow(focusedId,false);
    focusedId=id;
    setGlow(id,true);
    setHovered(null);
    populateProjectPanel(id);
    drawMainMonitor(cfg.projectId);

    section.classList.add('is-focused');
    if(exploreUi)exploreUi.classList.add('is-dimmed');
    if(camReadout)camReadout.textContent=id.toUpperCase();
    if(modeReadout)modeReadout.textContent='INSPECT';

    const revealPanel=()=>{
      if(projectPanel){projectPanel.hidden=false;requestAnimationFrame(()=>projectPanel.classList.add('is-visible'));}
    };

    if(animated.epaperMaterial&&id==='epaper'&&gsap&&!reduced){
      gsap.timeline().to(animated.epaperMaterial,{emissiveIntensity:1.4,duration:.08,repeat:2,yoyo:true}).to(animated.epaperMaterial,{emissiveIntensity:0,duration:.18});
    }

    if(gsap&&!reduced){
      const state={tx:overview.target[0],ty:overview.target[1],tz:overview.target[2]};
      gsap.to(state,{tx:cfg.target[0],ty:cfg.target[1],tz:cfg.target[2],duration:1.15,ease:'power3.inOut'});
      gsap.to(camera.position,{x:cfg.camera[0],y:cfg.camera[1],z:cfg.camera[2],duration:1.15,ease:'power3.inOut',
        onUpdate:()=>camera.lookAt(state.tx,state.ty,state.tz),
        onComplete:revealPanel});
    }else{
      camera.position.fromArray(cfg.camera);camera.lookAt(new THREE.Vector3(...cfg.target));revealPanel();
    }
  }

  function returnOverview() {
    if(!focusedId)return;
    const old=focusedId;focusedId='';
    setGlow(old,false);
    drawMainMonitor();
    if(projectPanel){projectPanel.classList.remove('is-visible');setTimeout(()=>projectPanel.hidden=true,reduced?0:300);}
    if(exploreUi)exploreUi.classList.remove('is-dimmed');
    section.classList.remove('is-focused');
    if(camReadout)camReadout.textContent='OVERVIEW';
    if(modeReadout)modeReadout.textContent='EXPLORE';

    if(gsap&&!reduced){
      const state={tx:projectMap[old].target[0],ty:projectMap[old].target[1],tz:projectMap[old].target[2]};
      gsap.to(state,{tx:overview.target[0],ty:overview.target[1],tz:overview.target[2],duration:1.1,ease:'power3.inOut'});
      gsap.to(camera.position,{x:overview.position[0],y:overview.position[1],z:overview.position[2],duration:1.1,ease:'power3.inOut',
        onUpdate:()=>camera.lookAt(state.tx,state.ty,state.tz)});
    }else{
      camera.position.fromArray(overview.position);camera.lookAt(new THREE.Vector3(...overview.target));
    }
  }

  function bindInteractions() {
    enterButton?.addEventListener('click',enterLab);
    closeButtons.forEach(btn=>btn.addEventListener('click',returnOverview));

    section.addEventListener('pointerdown',event=>{
      if(!exploring||focusedId||event.button!==0)return;
      dragging=true;
      dragStart={x:event.clientX,y:event.clientY,yaw:view.targetYaw,pitch:view.targetPitch};
      section.classList.add('is-dragging');
    });

    window.addEventListener('pointerup',()=>{
      dragging=false;dragStart=null;section.classList.remove('is-dragging');
    });

    section.addEventListener('pointermove',event=>{
      lastPointerEvent=event;
      const rect=section.getBoundingClientRect();
      view.pointerX=((event.clientX-rect.left)/rect.width-.5)*2;
      view.pointerY=((event.clientY-rect.top)/rect.height-.5)*-2;

      if(dragging&&dragStart){
        const dx=(event.clientX-dragStart.x)/Math.max(rect.width,1);
        const dy=(event.clientY-dragStart.y)/Math.max(rect.height,1);
        view.targetYaw=clamp(dragStart.yaw-dx*1.05,-.36,.36);
        view.targetPitch=clamp(dragStart.pitch+dy*.48,-.13,.18);
      }

      if(!exploring||coarse||focusedId||!raycaster)return;
      const hit=findHotspot(raycast(event));
      setHovered(hit,event);
    });

    section.addEventListener('wheel',event=>{
      if(!exploring||focusedId)return;
      view.targetZoom=clamp(view.targetZoom+Math.sign(event.deltaY)*.34,-1.1,1.75);
    },{passive:true});

    section.addEventListener('pointerleave',()=>{
      view.pointerX=0;view.pointerY=0;
      if(!dragging)setHovered(null);
    });

    canvas.addEventListener('click',event=>{
      if(!exploring||focusedId||dragging||!raycaster)return;
      const hit=findHotspot(raycast(event));
      const id=hit?.userData?.hotspot;
      if(id)focusProject(id);
    });

    listLinks.forEach(link=>{
      const id=link.dataset.labHotspot;
      link.addEventListener('click',event=>{
        if(section.classList.contains('lab-no-webgl'))return;
        event.preventDefault();
        focusProject(id);
      });
      link.addEventListener('mouseenter',()=>{if(!focusedId)setGlow(id,true);});
      link.addEventListener('mouseleave',()=>{if(!focusedId)setGlow(id,false);});
      link.addEventListener('focus',()=>{if(!focusedId)setGlow(id,true);});
      link.addEventListener('blur',()=>{if(!focusedId)setGlow(id,false);});
    });

    window.addEventListener('keydown',event=>{
      if(!visible)return;
      if(event.key==='Escape'){returnOverview();return;}
      if(!exploring&&event.key==='Enter'){enterLab();return;}
      if(exploring&&/^[1-6]$/.test(event.key)){
        const id=Object.keys(projectMap)[Number(event.key)-1];
        focusProject(id);
      }
      if(exploring&&focusedId&&event.key==='Enter'){
        window.location.href=projectMap[focusedId].href;
      }
    });

    window.addEventListener('resize',resize,{passive:true});

    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>{
        visible=entries.some(entry=>entry.isIntersecting);
        document.body.classList.toggle('lab-visible',visible);
      },{threshold:.01});
      observer.observe(section);
    }
  }

  async function init() {
    document.body.classList.add('lab-visible');
    updateProgress(8,'LOADING 3D ENGINE');
    try{
      const modules=await Promise.all([import(THREE_URL),import(GSAP_URL)]);
      THREE=modules[0];
      gsap=modules[1].gsap||modules[1].default||modules[1];
      updateProgress(34,'BUILDING ENGINEERING SCENE');
      buildScene();
      updateProgress(68,'CALIBRATING INTERACTIONS');
      bindInteractions();
      updateProgress(88,'POWERING INSTRUMENTS');
      setTimeout(()=>updateProgress(100,'WORKBENCH READY'),120);
      introSequence();
      renderLoop();
    }catch(error){
      console.warn('Interactive workbench unavailable:',error);
      showFallback();
    }
  }

  init();
})();
