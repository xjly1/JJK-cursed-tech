import { renderer, camera, composer } from './scene.js';
import { particles, positions, colors, sizes, targetPositions, targetColors, targetSizes, COUNT } from './particles.js';
import { currentTech, shakeIntensity } from './state.js';
import './handTracking.js';

function animate() {
    requestAnimationFrame(animate);

    if (shakeIntensity > 0 && Math.random() > 0.5) {
        renderer.domElement.style.transform =
        `translate(${(Math.random()-0.5)*shakeIntensity*40}px,
                   ${(Math.random()-0.5)*shakeIntensity*40}px)`;
    } else {
        renderer.domElement.style.transform = 'translate(0,0)';
    }

    const pos = particles.geometry.attributes.position.array;
    const col = particles.geometry.attributes.color.array;
    const siz = particles.geometry.attributes.size.array;

    const len = COUNT * 3;

    for(let i=0; i<len; i++) {
        pos[i] += (targetPositions[i] - pos[i]) * 0.1;
        col[i] += (targetColors[i] - col[i]) * 0.1;
    }

    for(let i=0; i<COUNT; i++) {
        siz[i] += (targetSizes[i] - siz[i]) * 0.1;
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
    particles.geometry.attributes.size.needsUpdate = true;

    if(currentTech === 'red') {
        particles.rotation.z -= 0.1;
    } else if (currentTech === 'purple') {
        particles.rotation.z += 0.2;
        particles.rotation.y += 0.05;
    } else if (currentTech === 'shrine') {
        particles.rotation.set(0, 0, 0);
    } else {
        particles.rotation.y += 0.005;
    }

    composer.render();
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});