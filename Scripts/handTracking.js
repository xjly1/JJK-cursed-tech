import { updateState, glowColor } from './state.js';

const videoElement = document.querySelector('.input_video');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7
});

// STABILITY SYSTEM
let lastGesture = 'neutral';
let stableCount = 0;
const STABLE_THRESHOLD = 5;

// SMOOTHING
let prevLm = null;
function smoothLandmarks(lm) {
    if (!prevLm) {
        prevLm = lm;
        return lm;
    }

    const smoothed = lm.map((point, i) => ({
        x: prevLm[i].x * 0.7 + point.x * 0.3,
        y: prevLm[i].y * 0.7 + point.y * 0.3,
        z: prevLm[i].z * 0.7 + point.z * 0.3
    }));

    prevLm = smoothed;
    return smoothed;
}

// GESTURE STABILIZER
function detectStableGesture(newGesture) {
    if (newGesture === lastGesture) {
        stableCount++;
    } else {
        stableCount = 0;
        lastGesture = newGesture;
    }

    if (stableCount >= STABLE_THRESHOLD) {
        updateState(newGesture);
    }
}

hands.onResults((results) => {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    let detected = 'neutral';

    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
        detectStableGesture('neutral');
        return;
    }

    // Use just one hand
    let lm = results.multiHandLandmarks[0];

    // SMOOTHING
    lm = smoothLandmarks(lm);

    drawConnectors(canvasCtx, lm, HAND_CONNECTIONS, { color: glowColor, lineWidth: 5 });
    drawLandmarks(canvasCtx, lm, { color: '#fff', lineWidth: 1, radius: 2 });

    const isUp = (t, p) => lm[t].y < lm[p].y;

    // DYNAMIC PINCH
    const pinch = Math.hypot(lm[8].x - lm[4].x, lm[8].y - lm[4].y);

    const handSize = Math.hypot(
        lm[0].x - lm[9].x,
        lm[0].y - lm[9].y
    );

    const pinchThreshold = handSize * 0.4;

    // DETECTION
    if (pinch < pinchThreshold) detected = 'purple';
    else if (isUp(8,6) && isUp(12,10) && isUp(16,14) && isUp(20,18)) detected = 'shrine';
    else if (isUp(8,6) && isUp(12,10) && !isUp(16,14)) detected = 'void';
    else if (isUp(8,6) && !isUp(12,10)) detected = 'red';

    detectStableGesture(detected);
});

const cameraUtils = new window.Camera(videoElement, {
    onFrame: async () => {
        if (videoElement.videoWidth && videoElement.videoHeight) {
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
        }

        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

cameraUtils.start();