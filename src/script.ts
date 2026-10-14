import './style.css';

import Application from './Application/Application';

const app: Application = new Application();

const preboot = document.getElementById('preboot');
if (preboot) {
    requestAnimationFrame(() => preboot.remove());
}
