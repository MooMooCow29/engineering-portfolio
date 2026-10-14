import './style.css';

import Application from './Application/Application';

try {
    const app: Application = new Application();
    // @ts-ignore
    window.__portfolioApplication = app;
} catch (error) {
    console.error('Portfolio startup failed:', error);

    const message =
        error instanceof Error ? error.message : String(error || 'Unknown error');

    let panel = document.getElementById('portfolio-startup-error');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'portfolio-startup-error';
        panel.style.position = 'fixed';
        panel.style.inset = '0';
        panel.style.zIndex = '100000';
        panel.style.background = '#000';
        panel.style.color = '#fff';
        panel.style.font = '16px monospace';
        panel.style.padding = '48px';
        panel.style.boxSizing = 'border-box';
        document.body.appendChild(panel);
    }

    panel.innerHTML =
        '<p style="color:#ff6b6b;margin:0 0 12px"><b>PORTFOLIO STARTUP ERROR</b></p>' +
        '<p style="margin:0 0 8px">The application bundle loaded, but runtime initialisation failed.</p>' +
        '<pre style="white-space:pre-wrap;color:#ddd">' +
        message.replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch] as string)) +
        '</pre>';
}
