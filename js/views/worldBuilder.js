// ═══════════════════════════════════════════════
//  VIEW — WorldBuilder
//  Builds the entire 3D scene: ocean, islands,
//  buildings, trees, bridges, boats, lighting.
// ═══════════════════════════════════════════════
'use strict';

const WorldBuilder = (() => {

  // ── Internal refs set by init() ──
  let _scene, _OGeo, _origY, _aLight, _plane, _planeBanner;

  // ── Material helpers ──────────────────────
  function lm(hex) {
    return new THREE.MeshLambertMaterial({ color: hex });
  }
  function pm(hex) {
    return new THREE.MeshPhongMaterial({ color: hex, flatShading: true, shininess: 8 });
  }

  // ── Geometry helpers ──────────────────────
  function box(w, h, d, color, px, py, pz) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lm(color));
    m.position.set(px, py, pz);
    m.castShadow = true; m.receiveShadow = true;
    _scene.add(m); return m;
  }

  // ── LIGHTING ──────────────────────────────
  function buildLighting() {
    _scene.add(new THREE.AmbientLight(0xfff0d8, 1.0));

    const sun = new THREE.DirectionalLight(0xfff8e8, 2.0);
    sun.position.set(40, 80, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far  = 250;
    sun.shadow.camera.left = sun.shadow.camera.bottom = -100;
    sun.shadow.camera.right= sun.shadow.camera.top    =  100;
    sun.shadow.bias = -0.0005;
    _scene.add(sun);

    const fill = new THREE.DirectionalLight(0xb0d8ff, 0.5);
    fill.position.set(-30, 20, -20);
    _scene.add(fill);
  }

  // ── OCEAN ─────────────────────────────────
  function buildOcean() {
    _OGeo = new THREE.PlaneGeometry(400, 400, 80, 80);
    const ocean = new THREE.Mesh(_OGeo, pm(0x1ab8d0));
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = -1.5;
    ocean.receiveShadow = true;
    _scene.add(ocean);

    _origY = new Float32Array(_OGeo.attributes.position.count);
    for (let i = 0; i < _origY.length; i++)
      _origY[i] = _OGeo.attributes.position.getY(i);

    // Deep color patches
    for (let i = 0; i < 14; i++) {
      const p = new THREE.Mesh(
        new THREE.CircleGeometry(5 + Math.random() * 9, 7),
        lm(Math.random() > .5 ? 0x10a8c0 : 0x25cce0)
      );
      p.rotation.x = -Math.PI / 2;
      p.position.set((Math.random() - .5) * 130, -1.48, (Math.random() - .5) * 130);
      _scene.add(p);
    }
  }

  // ── ISLAND LAYERS ─────────────────────────
  function makeIsland(cx, cz, radius, height, colors) {
    const n = colors.length;
    const layerH = height / n;
    let y = 0;
    colors.forEach((col, i) => {
      const r0 = radius * (1 - i * 0.10);
      const r1 = radius * (1 - (i + 1) * 0.10) * 0.92;
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, layerH, 7 + i, 1), pm(col));
      mesh.position.set(cx, y + layerH / 2, cz);
      mesh.castShadow = true; mesh.receiveShadow = true;
      _scene.add(mesh);
      y += layerH;
    });
    return y; // returns top Y
  }

  // ── TREES ─────────────────────────────────
  function coniferTree(x, y, z, h) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(.07, .12, h * .35, 5), lm(0x5a3820));
    t.position.set(x, y + h * .175, z); t.castShadow = true; _scene.add(t);
    [[.32, .55, .48],[.26, .68, .38],[.18, .80, .28]].forEach(([rf, yf, hf]) => {
      const c = new THREE.Mesh(new THREE.ConeGeometry(h * rf, h * hf, 6), pm(0x2d7a3a));
      c.position.set(x, y + h * yf, z); c.castShadow = true; _scene.add(c);
    });
    const top = new THREE.Mesh(new THREE.ConeGeometry(h * .1, h * .22, 6), pm(0x48a855));
    top.position.set(x, y + h * .92, z); top.castShadow = true; _scene.add(top);
  }

  function palmTree(x, y, z, h) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(.055, .09, h, 6), lm(0x8a6030));
    t.position.set(x, y + h / 2, z); t.castShadow = true; _scene.add(t);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const fr = new THREE.Mesh(new THREE.BoxGeometry(.07, .04, h * .42), lm(i % 2 ? 0x3a9030 : 0x4aaa40));
      fr.position.set(x + Math.cos(a) * h * .28, y + h + .05, z + Math.sin(a) * h * .28);
      fr.rotation.y = -a; fr.rotation.z = .55;
      fr.castShadow = true; _scene.add(fr);
    }
  }

  function roundTree(x, y, z, r) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(.08, .13, r * 1.4, 5), lm(0x6a4020));
    t.position.set(x, y + r * .7, z); t.castShadow = true; _scene.add(t);
    const b1 = new THREE.Mesh(new THREE.SphereGeometry(r, 7, 6), pm(0x4a9838));
    b1.position.set(x, y + r * 1.5, z); b1.castShadow = true; _scene.add(b1);
    const b2 = new THREE.Mesh(new THREE.SphereGeometry(r * .65, 6, 5), pm(0x5ab848));
    b2.position.set(x + r * .35, y + r * 1.9, z - r * .2); b2.castShadow = true; _scene.add(b2);
  }

  // ── BUILDING ──────────────────────────────
  function makeBuilding(x, y, z, w, d, h, wallCol, roofCol, accentCol) {
    box(w + .35, .18, d + .35, 0xa09070, x, y + .09, z);
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lm(wallCol));
    body.position.set(x, y + h / 2 + .18, z);
    body.castShadow = true; body.receiveShadow = true; _scene.add(body);

    const str = new THREE.Mesh(new THREE.BoxGeometry(w + .06, .28, d + .06), lm(accentCol));
    str.position.set(x, y + h * .35 + .18, z); _scene.add(str);

    box(w + .25, .2, d + .25, roofCol, x, y + h + .28, z);

    const rg = new THREE.ConeGeometry(Math.sqrt(w * w + d * d) * .52, h * .42, 4);
    const rm = new THREE.Mesh(rg, pm(roofCol));
    rm.position.set(x, y + h + .55, z);
    rm.rotation.y = Math.PI / 4; rm.castShadow = true; _scene.add(rm);

    // windows
    const wm = new THREE.MeshLambertMaterial({ color: 0xd0eaf8, emissive: 0x80b8d8, emissiveIntensity: .25 });
    const cols = Math.max(1, Math.floor(w / 1.3));
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = x - w / 2 + .75 + c * (w - .5) / Math.max(cols - 1, 1);
        const wy = y + h * .26 + r * h * .34 + .18;
        const win = new THREE.Mesh(new THREE.BoxGeometry(.6, .52, .06), wm);
        win.position.set(wx, wy, z + d / 2 + .03); _scene.add(win);
      }
    }

    // door
    const dm = new THREE.Mesh(new THREE.BoxGeometry(.85, 1.15, .07), lm(0x7a4a18));
    dm.position.set(x, y + .75, z + d / 2 + .04); _scene.add(dm);
    box(1.4, .12, .8, 0xc8b898, x, y + .06, z + d / 2 + .6);
  }

  // ── ISLANDS ───────────────────────────────
  function buildIslands() {
    // Sobre mí — sandy
    const topSM = makeIsland(0, 0, 8, 3.5, [0xc4a460, 0xd4b470, 0xe8c880, 0xf0d890]);
    makeBuilding(0, topSM, 0, 3.8, 3.2, 3.5, 0xf5ead8, 0xc85a2a, 0xe07040);
    palmTree(-4.5, topSM, -2, 2.8); palmTree(-4, topSM, 2.5, 2.4);
    palmTree( 4.2, topSM, -2, 2.6); palmTree( 4.8, topSM, 2.2, 2.8);
    for (let i = 0; i < 9; i++) {
      const a = i / 9 * Math.PI * 2, r = 3.8 + Math.random() * .7;
      const b = new THREE.Mesh(new THREE.SphereGeometry(.2 + Math.random() * .15, 5, 4),
        lm([0xd04040, 0xe8a020, 0xf0c030, 0x90c040][i % 4]));
      b.position.set(Math.cos(a) * r, topSM + .2, Math.sin(a) * r); _scene.add(b);
    }

    // Estudios — green
    const topES = makeIsland(-22, -18, 7, 3, [0x4a8a38, 0x5a9a44, 0x6aaa50, 0x7aba5a]);
    makeBuilding(-22, topES, -18, 4.2, 3.5, 4.5, 0xe8e0d0, 0x4a7ab0, 0x3a6aa0);
    coniferTree(-26, topES, -21, 2.8); coniferTree(-26, topES, -15, 2.5);
    coniferTree(-18, topES, -22, 2.6); coniferTree(-18, topES, -15, 2.9);
    roundTree(-20, topES, -20, 1.0); roundTree(-24, topES, -16, .9);
    for (let i = 0; i < 6; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(.18, 5, 4), lm(0xffe060));
      b.position.set(-22 + (Math.random() - .5) * 5, topES + .18, -18 + (Math.random() - .5) * 5);
      _scene.add(b);
    }

    // Tecnologías — blue-grey
    const topTEC = makeIsland(22, -18, 7, 3.5, [0x3a5878, 0x4a6888, 0x5878a0, 0x6888b8]);
    makeBuilding(22, topTEC, -18, 4.5, 3.8, 5.5, 0xd8e4f0, 0x2a5888, 0x4a78a8);
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 2.5, 5), lm(0x8888a0));
    ant.position.set(22, topTEC + 9.0, -18); _scene.add(ant);
    _aLight = new THREE.Mesh(new THREE.SphereGeometry(.13, 5, 4),
      new THREE.MeshLambertMaterial({ color: 0xff3030, emissive: 0xff1010, emissiveIntensity: 1.2 }));
    _aLight.position.set(22, topTEC + 9.5, -18); _scene.add(_aLight);
    coniferTree(18, topTEC, -21, 2.6); coniferTree(26, topTEC, -21, 2.3);
    coniferTree(18, topTEC, -15, 2.2); coniferTree(26, topTEC, -15, 2.7);
    for (let i = 0; i < 3; i++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.1, .05, .65), lm(0x2050a0));
      panel.rotation.x = -.3;
      panel.position.set(22 - 1.5 + i * 1.5, topTEC + .3, -18 + 2.5); _scene.add(panel);
    }

    // Experiencia — purple
    const topEXP = makeIsland(-22, 18, 7.5, 3, [0x6a4080, 0x7a5090, 0x8a60a0, 0x9a70b0]);
    makeBuilding(-22, topEXP, 18, 5, 4, 4.8, 0xece4f0, 0x6a4890, 0x9060b8);
    makeBuilding(-26.5, topEXP, 14.5, 2.2, 1.8, 3.2, 0xddd0e8, 0x7a58a0, 0x9070b8);
    makeBuilding(-17.5, topEXP, 21.5, 2.4, 2.1, 3.0, 0xe4daf0, 0x7050a0, 0x8860b0);
    roundTree(-25.5, topEXP, 20, .95); roundTree(-19, topEXP, 15.5, .88);
    coniferTree(-26, topEXP, 22, 2.2); coniferTree(-18, topEXP, 15, 2.4);

    // Proyectos — golden
    const topPROY = makeIsland(22, 18, 7, 3, [0x906020, 0xa07030, 0xb08040, 0xc09050]);
    makeBuilding(22, topPROY, 18, 3.2, 3.2, 5.8, 0xe8e0c8, 0x988020, 0xb8a030);
    makeBuilding(25.5, topPROY, 18, 1.1, .9, 2.2, 0xd8d0a8, 0xb09030, 0xc8a828);
    makeBuilding(27,   topPROY, 18, 1.1, .9, 2.2, 0xd8d0a8, 0xb09030, 0xc8a828);
    for (let i = 0; i < 4; i++) {
      const l = new THREE.Mesh(new THREE.SphereGeometry(.07, 4, 3),
        new THREE.MeshLambertMaterial({ color: 0x40ff40, emissive: 0x20ee20, emissiveIntensity: 1.2 }));
      l.position.set(25.15 + (i > 1 ? 1.5 : 0), topPROY + .38 + (i % 2) * .45, 17.7);
      _scene.add(l);
    }
    palmTree(19, topPROY, 15, 2.4); palmTree(25, topPROY, 21, 2.1);
    roundTree(19, topPROY, 21, .9); coniferTree(25, topPROY, 15, 2.3);

    // Idiomas — teal
    const topIDI = makeIsland(0, -28, 6, 2.8, [0x288858, 0x389868, 0x48a878, 0x58b888]);
    const gbase = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, 2.8, 8), lm(0xd8ecd8));
    gbase.position.set(0, topIDI + 1.4, -28); gbase.castShadow = true; _scene.add(gbase);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1.9, 10, 8), pm(0x4090d0));
    globe.position.set(0, topIDI + 4.5, -28); globe.castShadow = true; _scene.add(globe);
    [0, .65, -.65, Math.PI / 2].forEach((ry, i) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.92, .045, 4, 28), lm(0xffffff));
      ring.position.set(0, topIDI + 4.5, -28);
      if (i < 3) ring.rotation.x = ry; else ring.rotation.y = ry;
      _scene.add(ring);
    });
    palmTree(-3.2, topIDI, -30.5, 2.2); palmTree(-3.8, topIDI, -26, 2.0);
    palmTree( 3.2, topIDI, -30.5, 2.1); palmTree( 3.8, topIDI, -26, 2.3);
  }

  // ── BRIDGES ───────────────────────────────
  function buildBridges() {
    const pairs = [
      [-15, -13, -4, -3],
      [ 15, -13,  4, -3],
      [-15,  13, -4,  3],
      [ 15,  13,  4,  3],
      [  0,  -6,  0, -22],
    ];
    pairs.forEach(([ax, az, bx, bz]) => {
      const dx = bx - ax, dz = bz - az;
      const len = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dx, dz);
      const planks = Math.floor(len / 1.1);
      for (let i = 0; i < planks; i++) {
        const t = (i + .5) / planks;
        const arc = Math.sin(t * Math.PI) * .7;
        const plank = new THREE.Mesh(
          new THREE.BoxGeometry(1.9, .13, .85),
          lm(i % 2 === 0 ? 0xb8903a : 0xa07830)
        );
        plank.position.set(ax + dx * t, arc + .05, az + dz * t);
        plank.rotation.y = angle;
        plank.castShadow = true; _scene.add(plank);
      }
      const posts = Math.floor(planks / 4);
      for (let i = 0; i <= posts; i++) {
        const t = i / posts;
        const post = new THREE.Mesh(new THREE.BoxGeometry(.1, 1.4, .1), lm(0x7a6020));
        post.position.set(ax + dx * t, Math.sin(t * Math.PI) * .7 + .7, az + dz * t);
        _scene.add(post);
      }
    });
  }

  // ── BOATS ─────────────────────────────────
  function buildBoats() {
    const configs = [
      [-34,  4, 0xe84030], [ 34, -6, 0x2060b8],
      [  8, 32, 0x40b840], [-12,-38, 0xe8b030],
    ];
    configs.forEach(([bx, bz, hull]) => {
      const h = new THREE.Mesh(new THREE.BoxGeometry(2.8, .55, 1.2), lm(hull));
      h.position.set(bx, -1.2, bz); _scene.add(h);
      const c2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, .65, .9), lm(0xf5f0e0));
      c2.position.set(bx - .3, -.8, bz); _scene.add(c2);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 2.2, 4), lm(0x8a6030));
      mast.position.set(bx + .5, .0, bz); _scene.add(mast);
      const sail = new THREE.Mesh(new THREE.BoxGeometry(.05, 1.4, 1.0), lm(0xf8f4e8));
      sail.position.set(bx + .5, .8, bz); _scene.add(sail);
    });
  }

  // ── AIRPLANE ──────────────────────────────
  function buildPlane() {
    const g = new THREE.Group();

    // Fuselage (cylinder along Z via rotation)
    const fuse = new THREE.Mesh(new THREE.CylinderGeometry(.22, .28, 5.5, 8), lm(0xf0f4ff));
    fuse.rotation.x = Math.PI / 2;
    g.add(fuse);

    // Nose cone (tip at +Z)
    const nose = new THREE.Mesh(new THREE.ConeGeometry(.22, 1.5, 8), lm(0xe0eaff));
    nose.rotation.x = Math.PI / 2;
    nose.position.z = 3.25;
    g.add(nose);

    // Tail fairing
    const tail = new THREE.Mesh(new THREE.ConeGeometry(.15, 1.0, 6), lm(0xe0eaff));
    tail.rotation.x = -Math.PI / 2;
    tail.position.z = -3.0;
    g.add(tail);

    // Wings
    const wing = new THREE.Mesh(new THREE.BoxGeometry(7.0, .09, 1.6), lm(0xe4eeff));
    wing.position.set(0, -.05, .4);
    g.add(wing);

    // Wing tip winglets
    [-3.4, 3.4].forEach(wx => {
      const wl = new THREE.Mesh(new THREE.BoxGeometry(.08, .55, .5), lm(0xd8e4f8));
      wl.position.set(wx, .22, .55);
      g.add(wl);
    });

    // Horizontal stabilisers
    const stab = new THREE.Mesh(new THREE.BoxGeometry(2.8, .07, .7), lm(0xe0eaff));
    stab.position.set(0, .0, -2.4);
    g.add(stab);

    // Vertical fin
    const fin = new THREE.Mesh(new THREE.BoxGeometry(.09, 1.0, .85), lm(0xd8e4f8));
    fin.position.set(0, .5, -2.4);
    g.add(fin);

    // Engines (under wings)
    [-1.6, 1.6].forEach(ex => {
      const eng = new THREE.Mesh(new THREE.CylinderGeometry(.15, .12, .9, 7), lm(0xb8c4d8));
      eng.rotation.x = Math.PI / 2;
      eng.position.set(ex, -.26, .35);
      g.add(eng);
      // inlet ring
      const ring = new THREE.Mesh(new THREE.TorusGeometry(.16, .025, 5, 14), lm(0x8090a8));
      ring.rotation.x = Math.PI / 2;
      ring.position.set(ex, -.26, .8);
      g.add(ring);
    });

    g.position.set(55, 18, 0);
    _scene.add(g);
    _plane = g;

    // ── Banner sprite ────────────────────────
    const cvs = document.createElement('canvas');
    cvs.width = 520; cvs.height = 96;
    const ctx = cvs.getContext('2d');

    ctx.fillStyle = 'rgba(6, 14, 28, 0.93)';
    ctx.fillRect(0, 0, 520, 96);

    ctx.strokeStyle = 'rgba(77, 184, 212, 0.65)';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 516, 92);

    ctx.fillStyle = '#4db8d4';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('✦  Ayman Sbay \xB7 Backend Dev', 16, 33);

    ctx.fillStyle = '#b8d8f0';
    ctx.font = '17px monospace';
    ctx.fillText('PHP  \xB7  Laravel  \xB7  React  \xB7  Java', 16, 59);

    ctx.fillStyle = '#5a80a0';
    ctx.font = '13px monospace';
    ctx.fillText('ES \xB7 CA \xB7 EN \xB7 AR  \xB7  Disponible ✓', 16, 82);

    const tex = new THREE.CanvasTexture(cvs);
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
    spr.scale.set(14, 2.6, 1);
    _scene.add(spr);
    _planeBanner = spr;
  }

  // ── PUBLIC API ────────────────────────────
  return {
    init(scene) {
      _scene = scene;
      buildLighting();
      buildOcean();
      buildIslands();
      buildBridges();
      buildBoats();
      buildPlane();
    },
    // Expose for animation loop
    getOceanGeo()     { return _OGeo; },
    getOrigY()        { return _origY; },
    getAntennaLight() { return _aLight; },
    getPlane()        { return _plane; },
    getPlaneBanner()  { return _planeBanner; },
  };

})();
