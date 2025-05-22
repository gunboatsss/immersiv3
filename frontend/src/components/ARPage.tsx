import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

/**
 * ARRotatePage Component: Show 3D model in AR with rotation.
 *
 * This component makes a Three.js scene, loads a 3D model from a GLB file,
 * and uses the WebXR API to show the model in the user's real environment.
 */
const ARPage  = () => {
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const modelRef = useRef<THREE.Group | null>(null);

    useEffect(() => {
        /**
         * Initial setup: Make scene, camera, renderer, and load the model.
         */
        const init = () => {
        // 1. Make a scene.
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // 2. Make a camera.
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.01,
            40
        );
        camera.position.z = 12;
        cameraRef.current = camera;

        // 3. Make a renderer.
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Set styles so the 3D view covers the whole screen and is on top.
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100vw';
        renderer.domElement.style.height = '100vh';
        renderer.domElement.style.zIndex = '10';
        renderer.domElement.style.backgroundColor = '#000000'; // Force black background

        document.body.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // 4. Add lights (ambient and directional).
        const ambientLight = new THREE.AmbientLight(0x203899, 1.0);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x6fbcf0, 1);
        directionalLight.position.set(0.5, 1, 0.3);
        scene.add(directionalLight);

        // 5. Load the 3D model (GLB file).  
        const loader = new GLTFLoader();
        loader.load(
            '/nft-assets/nft.glb', // "/nft-assets/nft.glb" - LOCAL: dev use only / For production, switch to external Urls
            (gltf) => {
            const model = gltf.scene;
            model.position.set(0, 1.8, -2);
            model.rotation.x = Math.PI / 6; 
            model.scale.set(0.22, 0.22, 0.22);
            scene.add(model);
            modelRef.current = model;
            console.log('Model loaded successfully');
            },
            undefined,
            (error) => {
            console.error('Error loading model:', error);
            }
        );

        // 6. Add the AR button (made by ARButton).
        document.body.appendChild(ARButton.createButton(renderer));

        // 7. Add event listener to handle screen resize.
        window.addEventListener('resize', onWindowResize);
        };

        /**
         * Handle window resize: Update camera and renderer when the screen changes size.
         */
        const onWindowResize = () => {
        if (cameraRef.current && rendererRef.current) {
            const camera = cameraRef.current;
            const renderer = rendererRef.current;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        };

        /**
         * Animation loop:  Do this repeatedly to render the scene and rotate the model.
         */
        const animate = () => {
        if (rendererRef.current) {
            rendererRef.current.setAnimationLoop(() => {
            if (modelRef.current) {
                modelRef.current.rotation.y += 0.002;  // You can change the rotation speed here.
            }
            if (sceneRef.current && cameraRef.current) {
                rendererRef.current!.render(sceneRef.current, cameraRef.current);
            }
            });
        }
        };

        // Start everything when the component is first added to the page.
        init();
        animate();

        // Clean up when the component is removed from the page.  Important for performance.
        return () => {
        window.removeEventListener('resize', onWindowResize);
        if (rendererRef.current) {
            rendererRef.current.dispose(); //  Important:  Release WebGL resources.
        }
        };
    }, []);

    // This component doesn't directly render any HTML elements.  The canvas is created in useEffect.
    return null;
};

export default ARPage;
