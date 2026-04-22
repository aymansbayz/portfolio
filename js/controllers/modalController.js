// ═══════════════════════════════════════════════
//  CONTROLLER — ModalController
//  Opens, closes and manages modal panels.
// ═══════════════════════════════════════════════
'use strict';

const ModalController = (() => {

  function open(key) {
    const el = document.getElementById('m-' + key);
    if (el) el.classList.add('open');
  }

  function close(key) {
    const el = document.getElementById('m-' + key);
    if (el) el.classList.remove('open');
  }

  function closeAll() {
    document.querySelectorAll('.mo.open').forEach(m => m.classList.remove('open'));
  }

  // Close on backdrop click
  function onBackdropClick(e) {
    if (e.target.classList.contains('mo')) {
      e.target.classList.remove('open');
    }
  }

  function init() {
    document.querySelectorAll('.mo').forEach(el => {
      el.addEventListener('click', onBackdropClick);
    });
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') closeAll();
    });
  }

  return { init, open, close, closeAll };
})();
