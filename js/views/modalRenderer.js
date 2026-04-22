// ═══════════════════════════════════════════════
//  VIEW — ModalRenderer
//  Renders each modal's content from PortfolioData
// ═══════════════════════════════════════════════
'use strict';

const ModalRenderer = (() => {

  function chipClass(type) {
    return { fe: 'cfe', be: 'cbe', db: 'cdb', soft: 'csf' }[type] || 'csf';
  }

  function chips(arr, type) {
    return arr.map(t => `<span class="chip ${chipClass(type)}">${t}</span>`).join('');
  }

  // ── Sobre mí ────────────────────────────
  function renderSobremi() {
    const d = PortfolioData;
    return `
      <p style="font-size:13px;line-height:2;color:var(--ink2)">${d.personal.about}</p>
      <div class="st">Habilidades personales</div>
      <div class="chips">${chips(d.softSkills, 'soft')}</div>
      <div class="st">Contacto</div>
      <div class="cr"><span class="ci">✉️</span><div><div class="csub">Email</div>
        <div class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div></div></div>
      <div class="cr"><span class="ci">📞</span><div><div class="csub">Teléfono</div>
        <div class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></div></div></div>
      <div class="cr"><span class="ci">📍</span><div><div class="csub">Ubicación</div>
        <div class="cv">${d.personal.location}</div></div></div>
      <div class="cr"><span class="ci">🚗</span><div><div class="csub">Movilidad</div>
        <div class="cv">${d.personal.license}</div></div></div>
    `;
  }

  // ── Estudios ─────────────────────────────
  function renderEstudios() {
    const items = PortfolioData.estudios.map(e => `
      <div class="tli">
        <div class="tli-d">${e.date}</div>
        <div class="tli-n">${e.name}</div>
        <div class="tli-p">${e.desc}</div>
      </div>
    `).join('');

    const allTech = [
      ...PortfolioData.tecnologias.frontend.map(t => `<span class="chip cfe">${t}</span>`),
      ...PortfolioData.tecnologias.backend.map(t  => `<span class="chip cbe">${t}</span>`),
    ].join('');

    return `
      <div class="tl">${items}</div>
      <div class="st">Certificados</div>
      <div class="chips">${allTech}</div>
    `;
  }

  // ── Tecnologías ───────────────────────────
  function renderTecnologias() {
    const t = PortfolioData.tecnologias;
    const levels = t.levels.map(l => `
      <div class="sk">
        <div class="sk-m"><span>${l.name}</span><span style="color:${l.color}">${l.pct >= 75 ? 'Avanzado' : 'Intermedio'}</span></div>
        <div class="sk-t"><div class="sk-f" style="width:${l.pct}%;background:${l.color}"></div></div>
      </div>
    `).join('');

    return `
      <div class="st">Frontend</div>
      <div class="chips">${chips(t.frontend, 'fe')}</div>
      <div class="st">Backend</div>
      <div class="chips">${chips(t.backend, 'be')}</div>
      <div class="st">Bases de datos & herramientas</div>
      <div class="chips">${chips(t.databases, 'db')}${chips(t.tools, 'soft')}</div>
      <div class="st">Nivel</div>
      ${levels}
    `;
  }

  // ── Experiencia ───────────────────────────
  function renderExperiencia() {
    const e = PortfolioData.experiencia;
    const resp = e.responsibilities.map(r => `
      <div class="bi"><span class="bd">▸</span>${r}</div>
    `).join('');
    const other = e.other.map(o => `
      <div class="ec"><div class="en">${o.name}</div><div class="es">${o.desc}</div></div>
    `).join('');

    return `
      <div class="tl">
        <div class="tli">
          <div class="tli-d">${e.main.date}</div>
          <div class="tli-n">${e.main.name}</div>
          <div class="tli-p">${e.main.desc}</div>
        </div>
      </div>
      <div class="st">Responsabilidades</div>
      <div class="bl">${resp}</div>
      <div class="st">Otras experiencias</div>
      ${other}
    `;
  }

  // ── Proyectos ─────────────────────────────
  function renderProyectos() {
    const proj = PortfolioData.proyectos.map(p => `
      <div class="pc">
        <div class="pt">${p.name}</div>
        <div class="pd">${p.desc}</div>
        <a href="${p.url}" target="_blank" class="pl">Ver proyecto →</a>
      </div>
    `).join('');

    return `
      ${proj}
      <div class="coming">
        <div style="font-size:22px;margin-bottom:7px">🌱</div>
        <div style="font-weight:600;margin-bottom:3px">Más proyectos en camino</div>
        <div style="font-size:11px;opacity:.6">Vuelve pronto</div>
      </div>
    `;
  }

  // ── Idiomas ───────────────────────────────
  function renderIdiomas() {
    const cards = PortfolioData.idiomas.map(l => `
      <div class="lc">
        <div class="lf">${l.flag}</div>
        <div class="ln">${l.name}</div>
        <div class="ll">${l.level}</div>
      </div>
    `).join('');

    return `
      <div class="lg">${cards}</div>
      <p style="font-size:12px;color:var(--ink2);margin-top:14px;line-height:1.8">
        4 idiomas: ventaja clave para equipos internacionales y proyectos multilingüe.
      </p>
    `;
  }

  // ── Public: inject all modals ────────────
  function injectAll() {
    const modals = {
      sobremi:     { icon: '👤', eyebrow: 'Hello world',   title: 'Ayman Sbay Zekkari', content: renderSobremi() },
      estudios:    { icon: '📚', eyebrow: 'Formación',      title: 'Estudios',           content: renderEstudios() },
      tecnologias: { icon: '💻', eyebrow: 'Stack',          title: 'Tecnologías',        content: renderTecnologias() },
      experiencia: { icon: '🏢', eyebrow: 'Trayectoria',    title: 'Experiencia',        content: renderExperiencia() },
      proyectos:   { icon: '🚀', eyebrow: 'Work',           title: 'Proyectos',          content: renderProyectos() },
      idiomas:     { icon: '🌐', eyebrow: 'Comunicación',   title: 'Idiomas',            content: renderIdiomas() },
    };

    Object.entries(modals).forEach(([key, m]) => {
      const el = document.getElementById('m-' + key);
      if (!el) return;
      el.innerHTML = `
        <div class="mb">
          <div class="mh">
            <div class="mh-ico">${m.icon}</div>
            <div class="mh-t">
              <div class="mh-ey">${m.eyebrow}</div>
              <div class="mh-ti">${m.title}</div>
            </div>
            <button class="mcl" onclick="ModalController.close('${key}')">✕</button>
          </div>
          <div class="mbody">${m.content}</div>
        </div>
      `;
    });
  }

  return { injectAll };
})();
