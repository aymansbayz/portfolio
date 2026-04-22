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
const _plane       = WorldBuilder.getPlane();
const _planeBanner = WorldBuilder.getPlaneBanner();
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

  // Airplane
  const pA = t * 0.10, pR = 55, pH = 18;
  const pX = Math.cos(pA) * pR, pZ = Math.sin(pA) * pR;
  _plane.position.set(pX, pH, pZ);
  _plane.lookAt(Math.cos(pA + 0.01) * pR, pH, Math.sin(pA + 0.01) * pR);
  const bA = pA - 0.055;
  _planeBanner.position.set(Math.cos(bA) * pR, pH - 1.2, Math.sin(bA) * pR);

  renderer.render(scene, camera);
}

// ── CONTACT FORM ──────────────────────────────
function sendContact(via) {
  const name = (document.getElementById('cf-name').value.trim()) || 'Visitante';
  const msg  =  document.getElementById('cf-msg').value.trim();
  if (!msg) return;
  const d = PortfolioData;
  if (via === 'wa') {
    const text = encodeURIComponent('Hola Ayman! Soy ' + name + '.\n\n' + msg);
    window.open('https://wa.me/' + d.personal.phone.replace(/\D/g,'') + '?text=' + text, '_blank');
  } else {
    const sub  = encodeURIComponent('Portfolio — ' + name);
    const body = encodeURIComponent('Hola Ayman,\n\n' + msg + '\n\n— ' + name);
    window.open('mailto:' + d.personal.email + '?subject=' + sub + '&body=' + body);
  }
}

// ── LANGUAGE SWITCHER ─────────────────────────
function setLang(lang) {
  I18N.set(lang);
  ModalRenderer.injectAll();

  const navKeys = ['overview','sobremi','estudios','tecnologias','experiencia','proyectos','idiomas'];
  navKeys.forEach(key => {
    const btn = document.getElementById('nav-' + key);
    if (!btn) return;
    const ico = btn.querySelector('.nb-icon').outerHTML;
    btn.innerHTML = ico + I18N.ui('nav_' + key);
  });

  navKeys.forEach(key => {
    const lbl = document.getElementById('lbl-' + key);
    if (!lbl) return;
    const n = lbl.querySelector('.name');
    if (n) n.textContent = I18N.ui('lbl_' + key);
  });

  const itag = document.querySelector('.i-tag');
  if (itag) itag.textContent = I18N.ui('intro_tag');
  const ihint = document.querySelector('.i-hint');
  if (ihint) ihint.innerHTML = '<span class="ic">🖱</span> ' + I18N.ui('intro_hint');
  const ibtn = document.querySelector('.i-btn');
  if (ibtn) ibtn.textContent = I18N.ui('intro_btn');

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

// ── START ────────────────────────────────────
function startGame() {
  document.getElementById('intro').classList.add('gone');
  running = true;
  clock.start();
  animate();
}
