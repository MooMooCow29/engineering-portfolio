import sharp from 'sharp';
import { access, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const texturePath = 'static/models/Computer/baked_computer.jpg';
const markerPath = 'static/models/Computer/.karanveer-brand-v3';
const temporaryPath = 'static/models/Computer/baked_computer.karan.tmp.jpg';

const exists = async (path) => {
  try { await access(path); return true; } catch { return false; }
};

const svg = (width, height, body) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
     ${body}
   </svg>`
);

export async function brandComputerTexture() {
  if (!(await exists(texturePath))) {
    throw new Error('Computer texture is missing: ' + texturePath);
  }

  if (await exists(markerPath)) {
    console.log('branded  ', texturePath);
    return;
  }

  const overlays = [
    {
      left: 2225,
      top: 1870,
      input: svg(223, 122, `
        <rect width="223" height="122" rx="16" fill="#b8b7b1"/>
        <circle cx="42" cy="61" r="26" fill="#4d4d49"/>
        <text x="42" y="69" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="#b8b7b1">KS</text>
        <text x="82" y="48" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#4d4d49">KARANVEER</text>
        <text x="82" y="78" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.4" fill="#62625e">ENGINEERING</text>
      `)
    },
    {
      left: 1265,
      top: 2600,
      input: svg(380, 165, `
        <rect width="380" height="165" fill="#b9b8b3"/>
        <g transform="rotate(180 190 82.5)">
          <text x="28" y="70" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="#343431">KARANVEER</text>
          <text x="31" y="112" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="2" fill="#4b4b47">ENGINEERING</text>
        </g>
      `)
    },
    {
      left: 2735,
      top: 3260,
      input: svg(300, 180, `
        <rect width="300" height="180" rx="20" fill="#292929"/>
        <text x="24" y="45" font-family="Arial, sans-serif" font-size="31" font-weight="700" fill="#e7e7e4">KARANVEER</text>
        <text x="24" y="76" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="1.4" fill="#d3d3cf">ENGINEERING 2026</text>
        <line x1="24" y1="96" x2="276" y2="96" stroke="#666661" stroke-width="2"/>
        <text x="24" y="122" font-family="Arial, sans-serif" font-size="13" fill="#c8c8c4">MEng Electrical &amp; Electronic Engineering</text>
        <text x="24" y="147" font-family="Arial, sans-serif" font-size="13" fill="#b7b7b3">University of East Anglia</text>
      `)
    },
    {
      left: 1685,
      top: 515,
      input: svg(190, 260, `
        <rect width="190" height="260" rx="18" fill="#2c2c2b"/>
        <g transform="rotate(90 95 130)">
          <text x="21" y="105" font-family="Arial, sans-serif" font-size="29" font-weight="700" fill="#e4e4e1">KARANVEER</text>
          <text x="23" y="137" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="1.5" fill="#cececa">ENGINEERING</text>
          <text x="23" y="165" font-family="Arial, sans-serif" font-size="14" fill="#bcbcb8">2026</text>
        </g>
      `)
    }
  ];

  await sharp(texturePath)
    .composite(overlays)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(temporaryPath);

  await rename(temporaryPath, texturePath);
  await writeFile(markerPath, 'Karanveer Singh computer texture branding v3\n');

  console.log('branded  ', texturePath, '(removed original visible creator marks)');
}
