import * as THREE from 'three';
import { scene } from './scene.js';

export const COUNT = 20000;

export const geometry = new THREE.BufferGeometry();
export const positions = new Float32Array(COUNT * 3);
export const colors = new Float32Array(COUNT * 3);
export const sizes = new Float32Array(COUNT);

export const targetPositions = new Float32Array(COUNT * 3);
export const targetColors = new Float32Array(COUNT * 3);
export const targetSizes = new Float32Array(COUNT);

geometry.setDrawRange(0, COUNT);

const posAttr = new THREE.BufferAttribute(positions, 3);
posAttr.setUsage(THREE.DynamicDrawUsage);

const colAttr = new THREE.BufferAttribute(colors, 3);
colAttr.setUsage(THREE.DynamicDrawUsage);

const sizeAttr = new THREE.BufferAttribute(sizes, 1);
sizeAttr.setUsage(THREE.DynamicDrawUsage);

geometry.setAttribute('position', posAttr);
geometry.setAttribute('color', colAttr);
geometry.setAttribute('size', sizeAttr);

export const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
    })
);

scene.add(particles);