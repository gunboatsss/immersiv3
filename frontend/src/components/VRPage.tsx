import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * VRPage Component: Renders a 360° panoramic scene using Three.js.
 *
 * Loads a random .webp texture onto a sphere for immersive viewing.
 * Supports WebXR for VR devices and OrbitControls for desktop/mobile.
 * Includes auto-rotation for enhanced experience.
 */
const VRPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const sphereRef = useRef<THREE.Mesh | null>(null);
    const vrButtonRef = useRef<HTMLElement | null>(null);
    const isInitializedRef = useRef(false);
    const [isVRActive, setIsVRActive] = useState(false);
    const isMobile = /android|iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1); 

    useEffect(() => {
    if (isInitializedRef.current) {
        console.log('VRPage already initialized, skipping init');
        return;
    }
    console.log('Initializing VRPage');
    isInitializedRef.current = true;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;

    function init() {
        // === 1. Make a scene ===
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // === 2. Make a camera ===
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
        camera.position.set(0, 1.6, 0);
        cameraRef.current = camera;

        // === 3. Make a renderer ===
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';

        renderer.xr.enabled = true;
        rendererRef.current = renderer;

        if (containerRef.current) {
            containerRef.current.innerHTML = ''; // Clear first
            containerRef.current.appendChild(renderer.domElement);

            const vrButton = VRButton.createButton(renderer);
            vrButton.id = 'VRButton'; // Add id 'VRButton'
            vrButton.style.position = 'fixed';
            // Styling
            containerRef.current.appendChild(vrButton);
            vrButtonRef.current = vrButton;
        }

        // === 4. Add light ===
        scene.add(new THREE.AmbientLight(0xffffff, 1));

         // === 5. Load texture (.webp or .jpg file)
        const texturePaths = [
            '/media/space_1.webp',
            '/media/space_2.webp',
            '/media/space_3.webp',
            '/media/space_4.webp'
        ];

         // === 5.Create texture and sphere ===
         // Random texture
        const randomTexturePath = texturePaths[Math.floor(Math.random() * texturePaths.length)];
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(randomTexturePath, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            // Create sphere
            const sphereGeometry = new THREE.SphereGeometry(50, 60, 40);
            sphereGeometry.scale(-1, 1, 1);
            const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphereRef.current = sphere;
            scene.add(sphere);
        });

        // === 6. Controls ===
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.rotateSpeed = 0.3;
        controls.target.set(0, 1.6, -1);
        controls.update();

        // Resize
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        renderer.setAnimationLoop(() => {
            controls.update();
            if (sphereRef.current) {
                sphereRef.current.rotation.y += 0.001;
            }
            renderer.render(scene, camera);
        });
    }

    init();
    animate();

    return () => {
        // cleanup
    };
}, []);

    return (
        <div
            ref={containerRef} // index.css
            className="immersiv3-vr-container w-full h-screen fixed top-0 left-0 z-50"
        />
    );
};

export default VRPage;