// ═══════════════════════════════════════════════
//  CONTROLLER — CameraController
//  Handles fly-to animation, island click detection,
//  label projection and nav pill state.
// ═══════════════════════════════════════════════
'use strict';

const CameraController = (() => {

  let _camera, _scene;
  const CAM_DUR = 1.6;

  let currentView  = 'overview';
  let camFrom      = { pos: new THREE.Vector3(), target: new THREE.Vector3() };
  let camGoal      = { pos: new THREE.Vector3(), target: new THREE.Vector3() };
  let camT         = 1.0;
  let camElapsed   = 0;
  const camLookAt  = new THREE.Vector3();

  let autoAngle    = 0;

  const raycaster  = new THREE.Raycaster();
  const mouse      = new THREE.Vector2();
  const clickDiscs = {};

  // ── smoothstep easing ──
  function ease(t) { return t * t * (3 - 2 * t); }

  // ── FLY TO ──────────────────────────────
  function flyTo(key) {
    if (key === currentView && camT >= 1) return;
    const cfg = CAM_CONFIGS[key];
    if (!cfg) return;

    camFrom.pos    = _camera.position.clone();
    camFrom.target = camLookAt.clone();
    camGoal.pos    = cfg.pos.clone();
    camGoal.target = cfg.target.clone();
    camT           = 0;
    camElapsed     = 0;
    currentView    = key;

    // update nav pills
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const nb = document.getElementById('nav-' + key);
    if (nb) nb.classList.add('active');

    // hint text
    const hint = document.getElementById('hint-click');
    if (key !== 'overview') {
      hint.classList.remove('hidden');
      hint.children[0].textContent = 'Haz clic en la isla para ver más';
    } else {
      hint.classList.add('hidden');
    }

    ModalController.closeAll();
  }

  // ── BUILD CLICK DISCS ────────────────────
  function buildClickDiscs() {
    Object.entries(ISLAND_POS).forEach(([key, pos]) => {
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, .2, 12),
        new THREE.MeshLambertMaterial({ transparent: true, opacity: 0 })
      );
      disc.position.set(pos.x, 0, pos.z);
      disc.userData.key = key;
      _scene.add(disc);
      clickDiscs[key] = disc;
    });
  }

  // ── CLICK HANDLER ────────────────────────
  function onCanvasClick(e) {
    if (document.querySelector('.mo.open')) return;
    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight)  * 2 + 1;
    raycaster.setFromCamera(mouse, _camera);
    const hits = raycaster.intersectObjects(Object.values(clickDiscs));
    if (!hits.length) return;
    const key = hits[0].object.userData.key;
    if (currentView === key && camT >= 1) {
      ModalController.open(key);
    } else {
      flyTo(key);
    }
  }

  // ── LABEL PROJECTION ─────────────────────
  function updateLabels() {
    const W = window.innerWidth, H = window.innerHeight;
    Object.entries(ISLAND_POS).forEach(([key, pos]) => {
      const v = new THREE.Vector3(pos.x, LABEL_HEIGHTS[key], pos.z);
      v.project(_camera);
      const el = document.getElementById('lbl-' + key);
      if (!el) return;
      if (v.z < 1) {
        el.style.left = ((v.x + 1) / 2 * W) + 'px';
        el.style.top  = ((1 - (v.y + 1) / 2) * H) + 'px';
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  // ── TICK (called every frame) ─────────────
  function tick(dt) {
    if (camT < 1) {
      camElapsed += dt;
      camT = Math.min(camElapsed / CAM_DUR, 1);
      const pct = ease(camT);
      _camera.position.lerpVectors(camFrom.pos, camGoal.pos, pct);
      camLookAt.lerpVectors(camFrom.target, camGoal.target, pct);
      _camera.lookAt(camLookAt);
    }

    // Gentle auto-rotation in overview
    if (currentView === 'overview' && camT >= 1) {
      autoAngle += dt * .06;
      _camera.position.set(
        Math.sin(autoAngle) * 50,
        52,
        Math.cos(autoAngle) * 45
      );
      _camera.lookAt(0, 0, 0);
    }

    updateLabels();
  }

  // ── INIT ──────────────────────────────────
  function init(camera, scene) {
    _camera = camera;
    _scene  = scene;

    buildClickDiscs();
    document.getElementById('c').addEventListener('click', onCanvasClick);

    // Set initial camera
    _camera.position.copy(CAM_CONFIGS.overview.pos);
    _camera.lookAt(CAM_CONFIGS.overview.target);
    camLookAt.copy(CAM_CONFIGS.overview.target);
  }

  return { init, tick, flyTo };
})();
