import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import Application from './Application';
import Sizes from './Utils/Sizes';
import Camera from './Camera/Camera';
import Time from './Utils/Time';

export default class Renderer {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    time: Time;
    camera: Camera;
    instance: THREE.WebGLRenderer;
    cssInstance: CSS3DRenderer;

    constructor() {
        this.application = new Application();
        this.time = this.application.time;
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.camera = this.application.camera;

        this.setInstance();
    }

    setInstance() {
        /**
         * Henry's original project used two independent WebGLRenderer
         * instances: one for the world and one for a very subtle noise
         * overlay. That is visually clever, but it also creates two GPU
         * contexts at once. On some Windows/Chrome/ANGLE combinations this
         * can result in a permanently black canvas even though the bundle and
         * resources load correctly.
         *
         * The engineering portfolio keeps Henry's actual room, camera,
         * monitor/CSS3D interaction and baked assets, but uses a single WebGL
         * context for reliability. The removed overlay had only 0.12 DOM
         * opacity with 0.01 shader alpha, so the visual difference is tiny.
         */
        this.instance = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'default',
        });

        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 1.5));
        this.instance.setClearColor(0x000000, 0.0);

        this.instance.domElement.style.position = 'absolute';
        this.instance.domElement.style.zIndex = '1';
        this.instance.domElement.style.top = '0px';
        this.instance.domElement.style.left = '0px';

        document.querySelector('#webgl')?.appendChild(this.instance.domElement);

        this.cssInstance = new CSS3DRenderer();
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.domElement.style.position = 'absolute';
        this.cssInstance.domElement.style.top = '0px';
        this.cssInstance.domElement.style.left = '0px';

        document.querySelector('#css')?.appendChild(this.cssInstance.domElement);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 1.5));
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.application.camera.instance.updateProjectionMatrix();
        this.instance.render(this.scene, this.camera.instance);
        this.cssInstance.render(this.cssScene, this.camera.instance);
    }
}
