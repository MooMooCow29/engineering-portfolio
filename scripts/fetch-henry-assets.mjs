import { mkdir, access, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const sourceBase = 'https://raw.githubusercontent.com/henryjeff/portfolio-website/master/';
const assets = [
  'static/models/Computer/baked_computer.jpg',
  'static/models/Computer/computer_setup.glb',
  'static/models/Decor/baked_decor_modified.jpg',
  'static/models/Decor/decor.glb',
  'static/models/World/baked_environment.jpg',
  'static/models/World/environment.glb',
  'static/textures/monitor/layers/compressed/smudges.jpg',
  'static/textures/monitor/layers/compressed/shadow-compressed.png',
  'static/textures/monitor/video/base-static.mp4',
  'static/textures/monitor/video/static-texture-layer.mp4',
  'static/audio/mouse/mouse_down.mp3',
  'static/audio/mouse/mouse_up.mp3',
  'static/audio/keyboard/key_1.mp3',
  'static/audio/keyboard/key_2.mp3',
  'static/audio/keyboard/key_3.mp3',
  'static/audio/keyboard/key_4.mp3',
  'static/audio/keyboard/key_5.mp3',
  'static/audio/keyboard/key_6.mp3',
  'static/audio/startup/startup.mp3',
  'static/audio/atmosphere/office.mp3',
  'static/audio/cc/type.mp3'

];

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchAsset(path) {
  if (await exists(path)) {
    console.log('exists   ', path);
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  const response = await fetch(sourceBase + path);
  if (!response.ok) throw new Error(`Failed ${response.status}: ${path}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  await writeFile(path, bytes);
  console.log('download ', path, `(${Math.round(bytes.byteLength / 1024)} KiB)`);
}

for (const path of assets) await fetchAsset(path);

console.log('Henry Heffernan MIT-licensed scene assets are ready.');
