import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });

const logs = [];
page.on('console', msg => logs.push('[console ' + msg.type() + '] ' + msg.text()));
page.on('pageerror', err => logs.push('[pageerror] ' + err.stack));
page.on('requestfailed', req => logs.push('[requestfailed] ' + req.url() + ' :: ' + req.failure()?.errorText));

await page.goto('http://127.0.0.1:4175', { waitUntil: 'networkidle', timeout: 60000 });

const start = page.getByText('START', { exact: true });
await start.waitFor({ state: 'visible', timeout: 30000 });
await page.screenshot({ path: '/tmp/portfolio-before-start.png', fullPage: true });

await start.click();
await page.waitForTimeout(7000);

const diagnostics = await page.evaluate(() => {
  const canvases = [...document.querySelectorAll('canvas')];
  return {
    bodyText: document.body.innerText.slice(0, 2500),
    canvasCount: canvases.length,
    canvases: canvases.map(c => ({
      width: c.width,
      height: c.height,
      clientWidth: c.clientWidth,
      clientHeight: c.clientHeight,
      rect: c.getBoundingClientRect().toJSON(),
    })),
    webglChildren: document.querySelector('#webgl')?.children.length ?? -1,
    cssChildren: document.querySelector('#css')?.children.length ?? -1,
    uiOpacity: getComputedStyle(document.querySelector('#ui')).opacity,
    errors: document.querySelector('#portfolio-startup-error')?.textContent || '',
  };
});

logs.push('[diagnostics] ' + JSON.stringify(diagnostics, null, 2));
await writeFile('/tmp/portfolio-interaction.log', logs.join('\n'));
await page.screenshot({ path: '/tmp/portfolio-after-start.png', fullPage: true });

await browser.close();
