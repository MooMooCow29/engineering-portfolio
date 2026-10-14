import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Application from '../Application';
import UIEventBus from '../UI/EventBus';
import EventEmitter from './EventEmitter';
import Loading from './Loading';

export default class Resources extends EventEmitter {
    sources: Resource[];
    // Not sure about this one
    items: {
        texture: { [name: string]: LoadedTexture };
        cubeTexture: { [name: string]: LoadedCubeTexture };
        gltfModel: { [name: string]: LoadedModel };
        audio: { [name: string]: LoadedAudio };
    };
    toLoad: number;
    loaded: number;
    loaders: {
        gltfLoader: GLTFLoader;
        textureLoader: THREE.TextureLoader;
        cubeTextureLoader: THREE.CubeTextureLoader;
        audioLoader: THREE.AudioLoader;
    };
    application: Application;
    loading: Loading;

    constructor(sources: Resource[]) {
        super();

        this.sources = sources;

        this.items = { texture: {}, cubeTexture: {}, gltfModel: {}, audio: {} };
        // Only visual resources gate the first interactive frame.
        // Audio continues loading in the background so a slow decoder/network
        // cannot leave the visitor staring at the boot screen.
        this.toLoad = this.sources.filter((source) => source.type !== 'audio').length;
        this.loaded = 0;
        this.application = new Application();
        this.loading = this.application.loading;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader(),
            audioLoader: new THREE.AudioLoader(),
        };
    }

    startLoading() {
        // Load each source
        for (const source of this.sources) {
            const fail = (error: unknown) => {
                console.warn('Failed to load portfolio resource:', source.path, error);
                this.sourceFailed(source);
            };

            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => this.sourceLoaded(source, file),
                    undefined,
                    fail
                );
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        file.encoding = THREE.sRGBEncoding;
                        this.sourceLoaded(source, file);
                    },
                    undefined,
                    fail
                );
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => this.sourceLoaded(source, file),
                    undefined,
                    fail
                );
            } else if (source.type === 'audio') {
                this.loaders.audioLoader.load(
                    source.path,
                    (buffer) => this.sourceLoaded(source, buffer),
                    undefined,
                    fail
                );
            }
        }
    }

    sourceLoaded(source: Resource, file: LoadedResource) {
        this.items[source.type][source.name] = file;

        // Audio is optional for first paint and is deliberately allowed to
        // finish after the room is already usable.
        if (source.type === 'audio') return;

        this.markRequiredSourceComplete(source.name);
    }

    sourceFailed(source: Resource) {
        // A missing audio file should never block the experience.
        if (source.type === 'audio') return;

        // Likewise, a failed visual resource advances the loader so the user
        // gets the best available scene instead of an infinite black screen.
        this.markRequiredSourceComplete(source.name);
    }

    markRequiredSourceComplete(sourceName: string) {
        this.loaded = Math.min(this.loaded + 1, this.toLoad);

        this.loading.trigger('loadedSource', [
            sourceName,
            this.loaded,
            this.toLoad,
        ]);

        if (this.loaded >= this.toLoad) {
            this.trigger('ready');
        }
    }
}
