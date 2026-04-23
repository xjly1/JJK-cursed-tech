import { COUNT } from './particles.js';

export function getRed(i) {
    if(i < COUNT * 0.1) {
        const r = Math.random() * 9;
        const theta = Math.random() * 6.28;
        const phi = Math.acos(2 * Math.random() - 1);
        return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi), r: 3, g: 0.1, b: 0.1, s: 2.5 };
    } else {
        const armCount = 3;
        const t = (i / COUNT);
        const angle = t * 15 + ((i % armCount) * (Math.PI * 2 / armCount));
        const radius = 2 + (t * 40);
        return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), z: (Math.random() - 0.5) * (10 * t), r: 0.8, g: 0, b: 0, s: 1.0 };
    }
}

export function getVoid(i) {
    if (i < COUNT * 0.15) {
        const angle = Math.random() * Math.PI * 2;
        return { x: 26 * Math.cos(angle), y: 26 * Math.sin(angle), z: (Math.random()-0.5) * 1, r: 1, g: 1, b: 1, s: 2.5 };
    } else {
        const radius = 30 + Math.random() * 90;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return { x: radius * Math.sin(phi) * Math.cos(theta), y: radius * Math.sin(phi) * Math.sin(theta), z: radius * Math.cos(phi), r: 0.1, g: 0.6, b: 1.0, s: 0.7 };
    }
}

export function getPurple(i) {
    if (Math.random() > 0.8) return { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, z: (Math.random() - 0.5) * 100, r: 0.5, g: 0.5, b: 0.7, s: 0.8 };
    const r = 20;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi), r: 0.6, g: 0.5, b: 1.0, s: 2.5 };
}

export function getShrine(i) {
    const total = COUNT;
    if (i < total * 0.3) return { x: (Math.random()-0.5)*80, y: -15, z: (Math.random()-0.5)*80, r: 0.4, g: 0, b: 0, s: 0.8 };
    else if (i < total * 0.4) {
        const px = ((i%4)<2?1:-1)*12;
        const pz = ((i%4)%2==0?1:-1)*8;
        return { x: px+(Math.random()-0.5)*2, y: -15+Math.random()*30, z: pz+(Math.random()-0.5)*2, r: 0.2, g: 0.2, b: 0.2, s: 0.6 };
    } else if (i < total * 0.6) {
        const t = Math.random() * Math.PI * 2;
        const rad = Math.random() * 30;
        const curve = Math.pow(rad/30, 2) * 10;
        return { x: rad*Math.cos(t), y: 15 - curve + (Math.random()*2), z: rad*Math.sin(t)*0.6, r: 0.6, g: 0, b: 0, s: 0.6 };
    } else return { x: 0, y: 0, z: 0, r: 0, g: 0, b: 0, s: 0 };
}