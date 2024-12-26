
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Box Geometry and Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xadd8e6 }); // Light blue
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Box Outline
const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Black outline
const edges = new THREE.EdgesGeometry(geometry);
const outline = new THREE.LineSegments(edges, outlineMaterial);
box.add(outline);

// Camera Position
camera.position.z = 3;

// Orbit Controls for zoom and rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;

// Cursor Interaction
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Map mouse movement to box rotation
    box.rotation.y = mouseX * Math.PI;
    box.rotation.x = mouseY * Math.PI;
});

// Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required for damping
    renderer.render(scene, camera);
}

animate();