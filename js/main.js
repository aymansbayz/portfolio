// ═══════════════════════════════════════════════
//  APP — main.js
//  Entry point: sets up Three.js, wires MVC,
//  runs the render loop.
// ═══════════════════════════════════════════════
'use strict';

// ── RENDERER ────────────────────────────────
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('c'),
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x0a1628);

// ── SCENE + CAMERA ──────────────────────────
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0d1f3c, 0.012);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 400);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ── CLOCK ───────────────────────────────────
const clock = new THREE.Clock();
let running = false;

// ── INIT ALL MODULES ────────────────────────
WorldBuilder.init(scene);
CameraController.init(camera, scene);
ModalController.init();
ModalRenderer.injectAll();

// ── RENDER LOOP ─────────────────────────────
function animate() {
  if (!running) return;
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), .05);
  const t  = clock.elapsedTime;

  // Camera tick
  CameraController.tick(dt);

  // Ocean waves
  const OGeo  = WorldBuilder.getOceanGeo();
  const origY = WorldBuilder.getOrigY();
  const op    = OGeo.attributes.position;
  for (let i = 0; i < op.count; i++) {
    const x = op.getX(i), z = op.getZ(i);
    op.setY(i, origY[i] + Math.sin(x * .14 + t * 1.1) * .14 + Math.cos(z * .18 + t * .9) * .12);
  }
  op.needsUpdate = true;

  // Antenna blink
  const aLight = WorldBuilder.getAntennaLight();
  if (aLight) aLight.material.emissiveIntensity = .5 + Math.sin(t * 4) * .5;

  renderer.render(scene, camera);
}

// ── START ────────────────────────────────────
function startGame() {
  document.getElementById('intro').classList.add('gone');
  running = true;
  clock.start();
  animate();
}
