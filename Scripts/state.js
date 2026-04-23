import { COUNT, targetPositions, targetColors, targetSizes } from './particles.js';
import { bloomPass } from './scene.js';
import { getRed, getVoid, getPurple, getShrine } from './techniques.js';

export let currentTech = 'neutral';
export let shakeIntensity = 0;
export let glowColor = '#00ffff';

export function updateState(tech) {
    if(currentTech === tech) return;

    currentTech = tech;
    const nameEl = document.getElementById('technique-name');
    shakeIntensity = tech !== 'neutral' ? 0.4 : 0;

    if(tech === 'shrine') { glowColor = '#ff0000'; nameEl.innerText = "Domain Expansion: Malevolent Shrine"; bloomPass.strength = 2.5; }
    else if(tech === 'purple') { glowColor = '#bb00ff'; nameEl.innerText = "Secret Technique: Hollow Purple"; bloomPass.strength = 4.0; }
    else if(tech === 'void') { glowColor = '#00ffff'; nameEl.innerText = "Domain Expansion: Infinite Void"; bloomPass.strength = 2.0; }
    else if(tech === 'red') { glowColor = '#ff3333'; nameEl.innerText = "Reverse Cursed Technique: Red"; bloomPass.strength = 2.5; }
    else { glowColor = '#00ffff'; nameEl.innerText = "Neutral State"; bloomPass.strength = 1.0; }

    for(let i=0; i<COUNT; i++) {
        let p;

        if(tech === 'neutral') {
            if(i < COUNT * 0.05) {
                const r = 15 + Math.random()*20;
                const t = Math.random()*6.28;
                const ph = Math.random()*3.14;
                p = { x: r*Math.sin(ph)*Math.cos(t), y: r*Math.sin(ph)*Math.sin(t), z: r*Math.cos(ph), r: 0.1, g: 0.1, b: 0.2, s: 0.4 };
            } else p = { x:0, y:0, z:0, r:0, g:0, b:0, s:0 };
        }
        else if(tech === 'red') p = getRed(i);
        else if(tech === 'void') p = getVoid(i);
        else if(tech === 'purple') p = getPurple(i);
        else if(tech === 'shrine') p = getShrine(i);

        targetPositions[i*3] = p.x;
        targetPositions[i*3+1] = p.y;
        targetPositions[i*3+2] = p.z;

        targetColors[i*3] = p.r;
        targetColors[i*3+1] = p.g;
        targetColors[i*3+2] = p.b;

        targetSizes[i] = p.s;
    }
}