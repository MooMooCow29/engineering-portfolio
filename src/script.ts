import './style.css';

import Application from './Application/Application';

function showStartupError(title: string, detail: string, extraHtml = '') {
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
        panel.style.overflow = 'auto';
        document.body.appendChild(panel);
    }

    const escape = (value: string) =>
        value.replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch] as string));

    panel.innerHTML =
        '<p style="color:#ff6b6b;margin:0 0 12px"><b>' + escape(title) + '</b></p>' +
        '<p style="margin:0 0 12px;max-width:760px;line-height:1.6">' + escape(detail) + '</p>' +
        extraHtml;
}

function canCreateWebGLContext() {
    try {
        const canvas = document.createElement('canvas');
        const gl =
            canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
            canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
            canvas.getContext('experimental-webgl');

        return Boolean(gl);
    } catch (_) {
        return false;
    }
}

const firefox = /firefox/i.test(navigator.userAgent);

if (!canCreateWebGLContext()) {
    document.getElementById('preboot')?.remove();

    showStartupError(
        'WEBGL IS NOT AVAILABLE IN THIS BROWSER',
        'The immersive room requires WebGL, but Firefox did not provide a WebGL rendering context on this machine. The site cannot create the 3D scene until WebGL/hardware acceleration is available.',
        '<p style="margin:18px 0 8px;color:#aaa">Browser: ' +
            (firefox ? 'Firefox' : 'Other') +
            '</p>' +
        '<p style="margin:0 0 18px"><a href="diagnostics.html" style="color:#6db7ff">Open graphics diagnostics</a></p>' +
        '<p style="margin:0"><a href="projects/aurora-vx/" style="color:#6db7ff">Continue to engineering case studies</a></p>'
    );
} else {
    try {
        const app: Application = new Application();
        // @ts-ignore
        window.__portfolioApplication = app;
    } catch (error) {
        console.error('Portfolio startup failed:', error);
        document.getElementById('preboot')?.remove();

        const message =
            error instanceof Error ? error.message : String(error || 'Unknown error');

        showStartupError(
            'PORTFOLIO STARTUP ERROR',
            'The application bundle loaded, but runtime initialisation failed.',
            '<pre style="white-space:pre-wrap;color:#ddd">' +
                message.replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch] as string)) +
            '</pre>' +
            '<p><a href="diagnostics.html" style="color:#6db7ff">Open graphics diagnostics</a></p>'
        );
    }
}
