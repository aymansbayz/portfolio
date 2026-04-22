// ═══════════════════════════════════════════════
//  VIEW — ModalRenderer
//  Renders each modal's content using I18N + PortfolioData
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
    const lang = I18N.get();
    const ph_name = lang === 'en' ? 'Your name…'    : lang === 'ca' ? 'El teu nom…'      : 'Tu nombre…';
    const ph_msg  = lang === 'en' ? 'Your message…' : lang === 'ca' ? 'El teu missatge…' : 'Tu mensaje…';
    const lbl_wa  = lang === 'en' ? 'Send via WhatsApp'  : lang === 'ca' ? 'Enviar per WhatsApp'   : 'Enviar por WhatsApp';
    const lbl_em  = lang === 'en' ? 'Send via Email'     : lang === 'ca' ? 'Enviar per correu'     : 'Enviar por Email';
    const lbl_mob = lang === 'en' ? 'Driving licence · Mobile' : lang === 'ca' ? 'Carnet · Mobilitat' : 'Carnet · Movilidad';
    return `
      <p style="font-size:15px;line-height:1.95;color:#7a9ab8">${I18N.data('about')}</p>
      <div class="st">${I18N.sec('soft_skills')}</div>
      <div class="chips">${chips(I18N.data('skills'), 'soft')}</div>
      <div class="st">${I18N.sec('contact')}</div>
      <div class="cr"><span class="ci">📍</span><div><div class="csub">${I18N.sec('loc_l')}</div>
        <div class="cv">Blanes, Girona</div></div></div>
      <div class="cr"><span class="ci">🚗</span><div><div class="csub">${lbl_mob}</div>
        <div class="cv">${d.personal.license}</div></div></div>
      <div class="cf-wrap">
        <input  class="cf-inp" id="cf-name" type="text"  placeholder="${ph_name}">
        <textarea class="cf-msg" id="cf-msg" rows="3"    placeholder="${ph_msg}"></textarea>
        <div class="cf-btns">
          <button class="cf-btn cf-wa" onclick="sendContact('wa')">${lbl_wa}</button>
          <button class="cf-btn cf-em" onclick="sendContact('email')">${lbl_em}</button>
        </div>
      </div>
    `;
  }

  // ── Estudios ─────────────────────────────
  function renderEstudios() {
    const items = I18N.data('edu').map(e => `
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
      <div class="st">${I18N.sec('certificates')}</div>
      <div class="chips">${allTech}</div>
    `;
  }

  // ── Tecnologías ───────────────────────────
  function renderTecnologias() {
    const t = PortfolioData.tecnologias;
    const levels = t.levels.map(l => `
      <div class="sk">
        <div class="sk-m"><span>${l.name}</span><span style="color:${l.color}">${l.pct >= 75 ? I18N.sec('advanced') : I18N.sec('intermediate')}</span></div>
        <div class="sk-t"><div class="sk-f" style="width:${l.pct}%;background:${l.color}"></div></div>
      </div>
    `).join('');

    return `
      <div class="st">${I18N.sec('frontend')}</div>
      <div class="chips">${chips(t.frontend, 'fe')}</div>
      <div class="st">${I18N.sec('backend')}</div>
      <div class="chips">${chips(t.backend, 'be')}</div>
      <div class="st">${I18N.sec('db_tools')}</div>
      <div class="chips">${chips(t.databases, 'db')}${chips(t.tools, 'soft')}</div>
      <div class="st">${I18N.sec('level')}</div>
      ${levels}
    `;
  }

  // ── Experiencia ───────────────────────────
  function renderExperiencia() {
    const e = PortfolioData.experiencia;
    const resp  = I18N.data('resp').map(r => `
      <div class="bi"><span class="bd">▸</span>${r}</div>
    `).join('');
    const other = I18N.data('other').map(o => `
      <div class="ec"><div class="en">${o.name}</div><div class="es">${o.desc}</div></div>
    `).join('');

    return `
      <div class="tl">
        <div class="tli">
          <div class="tli-d">${e.main.date}</div>
          <div class="tli-n">${e.main.name}</div>
          <div class="tli-p">${I18N.data('exp_desc')}</div>
        </div>
      </div>
      <div class="st">${I18N.sec('resp')}</div>
      <div class="bl">${resp}</div>
      <div class="st">${I18N.sec('other_exp')}</div>
      ${other}
    `;
  }

  // ── Proyectos ─────────────────────────────
  function renderProyectos() {
    const proj = PortfolioData.proyectos.map(p => `
      <div class="pc">
        <div class="pt">${p.name}</div>
        <div class="pd">${I18N.data('proj_desc')}</div>
        <a href="${p.url}" target="_blank" class="pl">${I18N.sec('view_proj')}</a>
      </div>
    `).join('');

    return `
      ${proj}
      <div class="coming">
        <div style="font-size:22px;margin-bottom:7px">🌱</div>
        <div style="font-size:16px;font-weight:600;margin-bottom:4px;color:#dce8f5">${I18N.sec('more_coming')}</div>
        <div style="font-size:13px;opacity:.6">${I18N.sec('check_back')}</div>
      </div>
    `;
  }

  // ── Idiomas ───────────────────────────────
  function renderIdiomas() {
    const cards = I18N.data('langs').map(l => `
      <div class="lc">
        <div class="lf">${l.flag}</div>
        <div class="ln">${l.name}</div>
        <div class="ll">${l.level}</div>
      </div>
    `).join('');

    return `
      <div class="lg">${cards}</div>
      <p style="font-size:14px;color:#7a9ab8;margin-top:16px;line-height:1.85">
        ${I18N.sec('lang_note')}
      </p>
    `;
  }

  // ── Public: inject all modals ────────────
  function injectAll() {
    const defs = {
      sobremi:     { icon: '👤', fn: renderSobremi },
      estudios:    { icon: '📚', fn: renderEstudios },
      tecnologias: { icon: '💻', fn: renderTecnologias },
      experiencia: { icon: '🏢', fn: renderExperiencia },
      proyectos:   { icon: '🚀', fn: renderProyectos },
      idiomas:     { icon: '🌐', fn: renderIdiomas },
    };

    Object.entries(defs).forEach(([key, d]) => {
      const el = document.getElementById('m-' + key);
      if (!el) return;
      const m = I18N.modal(key);
      el.innerHTML = `
        <div class="mb">
          <div class="mh">
            <div class="mh-ico">${d.icon}</div>
            <div class="mh-t">
              <div class="mh-ey">${m.ey}</div>
              <div class="mh-ti">${m.ti}</div>
            </div>
            <button class="mcl" onclick="ModalController.close('${key}')">✕</button>
          </div>
          <div class="mbody">${d.fn()}</div>
        </div>
      `;
    });
  }

  function parseTwemoji() {
    if (typeof twemoji !== 'undefined') {
      twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
    }
  }

  return { injectAll: () => { injectAll(); parseTwemoji(); } };
})();
