export function createMonitorSurface({
  THREE,
  CSS3DRenderer,
  CSS3DObject,
  section,
  iframeSrc = './lab-os/index.html',
  worldPosition = [-0.35, 1.50, 0.575],
  worldRotation = [0, 0, 0],
  worldWidth = 3.02,
  pixelWidth = 1280,
  pixelHeight = 748
}) {
  const scene = new THREE.Scene();
  const renderer = new CSS3DRenderer();
  renderer.domElement.className = 'lab-css3d-renderer';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.overflow = 'hidden';
  renderer.domElement.style.pointerEvents = 'none';
  renderer.domElement.style.zIndex = '0';

  const shell = document.createElement('div');
  shell.className = 'lab-monitor-surface';
  shell.style.width = pixelWidth + 'px';
  shell.style.height = pixelHeight + 'px';

  const iframe = document.createElement('iframe');
  iframe.className = 'lab-monitor-iframe';
  iframe.src = iframeSrc;
  iframe.title = 'KaranOS engineering project terminal';
  iframe.loading = 'eager';
  iframe.setAttribute('allow', 'fullscreen');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = '0';
  iframe.style.pointerEvents = 'none';
  shell.appendChild(iframe);

  const object = new CSS3DObject(shell);
  object.position.set(...worldPosition);
  object.rotation.set(...worldRotation);
  const scale = worldWidth / pixelWidth;
  object.scale.set(scale, scale, scale);
  scene.add(object);

  section.appendChild(renderer.domElement);

  function resize(width, height) {
    renderer.setSize(Math.max(1, width), Math.max(1, height));
  }

  function render(camera) {
    renderer.render(scene, camera);
  }

  function setInteractive(active) {
    renderer.domElement.classList.toggle('is-interactive', active);
    shell.classList.toggle('is-interactive', active);
    renderer.domElement.style.pointerEvents = active ? 'auto' : 'none';
    iframe.style.pointerEvents = active ? 'auto' : 'none';
    renderer.domElement.setAttribute('aria-hidden', active ? 'false' : 'true');
    if (active) {
      try { iframe.contentWindow?.focus(); } catch (_) {}
    }
  }

  function destroy() {
    object.removeFromParent();
    renderer.domElement.remove();
  }

  return {
    scene,
    renderer,
    object,
    iframe,
    shell,
    resize,
    render,
    setInteractive,
    destroy
  };
}
