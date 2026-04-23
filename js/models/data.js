// ═══════════════════════════════════════════════
//  MODEL — portfolio data & island configuration
// ═══════════════════════════════════════════════
'use strict';

const PortfolioData = {

  // ── Personal info ──────────────────────────
  personal: {
    name:     'Ayman Sbay Zekkari',
    role:     'Web Application Developer',
    location: 'Blanes de Mar, Girona, España',
    email:    'ayman.zekkari2@gmail.com',
    phone:    '+34 691 717 544',
    license:  'Carnet de conducir válido',
    about:    'Desarrollador de aplicaciones web con experiencia en fullstack, formado en Institut Sa Palomera. Antes de tech trabajé en hostelería y logística — eso me dio habilidades reales de liderazgo, adaptabilidad y comunicación bajo presión.',
  },

  // ── Education ──────────────────────────────
  estudios: [
    {
      date:  '2022 – 2024',
      name:  'Institut Sa Palomera',
      desc:  'FP en Desarrollo de Aplicaciones Web (DAW). Arquitectura web, bases de datos y desarrollo completo front-end + back-end desde cero, con certificados en cada tecnología.',
    },
    {
      date:  'Hasta 2020',
      name:  'Escola Vedruna Malgrat de Mar',
      desc:  'Bachillerato. Base académica previa a la formación técnica.',
    },
  ],

  // ── Tech stack ─────────────────────────────
  tecnologias: {
    frontend:   ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React'],
    backend:    ['PHP', 'CodeIgniter', 'Laravel', 'Java'],
    databases:  ['MySQL', 'SQL'],
    tools:      ['Git', 'REST APIs'],
    levels: [
      { name: 'PHP / CodeIgniter',      pct: 80, color: '#4a8050' },
      { name: 'JavaScript / TypeScript', pct: 75, color: '#4a7ab0' },
      { name: 'React',                   pct: 60, color: '#4a7ab0' },
      { name: 'Java',                    pct: 57, color: '#7a5a9a' },
      { name: 'Laravel',                 pct: 63, color: '#4a8050' },
    ],
  },

  // ── Experience ─────────────────────────────
  experiencia: {
    main: {
      date: 'Ene 2023 – May 2024',
      name: 'GeniusX-Tech — Web Developer',
      desc: 'Desarrollo de sistema ERP completo. Backend PHP + CodeIgniter, integración frontend y optimización de rendimiento de aplicación.',
    },
    responsibilities: [
      'Backend ERP con PHP y CodeIgniter',
      'Integración frontend con backend',
      'Optimización de rendimiento e integridad de datos',
      'Code reviews y knowledge sharing',
    ],
    other: [
      { name: 'Carrefour',   desc: 'Reponedor — 2 temporadas de verano' },
      { name: 'Bimbo',       desc: 'Repartidor + liderazgo de equipo — +1 año' },
      { name: 'Hotel Marsol',desc: 'Camarero — temporada de verano' },
    ],
  },

  // ── Projects ───────────────────────────────
  proyectos: [
    {
      name: 'Gleam',
      desc: 'Tienda online de productos (Proyecto final de DAW).',
      url:  'https://slateblue-cat-348405.hostingersite.com/',
    },
    { 
      name: 'Librarium', 
      desc: 'Biblioteca digital de libros, con sistema importación de libros y lectura.', 
      url: 'https://librarium-project.vercel.app' 
    },
  ],

  // ── Languages ──────────────────────────────
  idiomas: [
    { flag: '🇪🇸', name: 'Español',  level: 'Nivel nativo' },
    { flag: '🏴󠁥󠁳󠁣󠁴󠁿', name: 'Catalán',  level: 'Nivel nativo' },
    { flag: '🇬🇧', name: 'Inglés',   level: 'Nivel alto' },
    { flag: '🇲🇦', name: 'Árabe',    level: 'Nivel alto' },
  ],

  // ── Soft skills ────────────────────────────
  softSkills: [
    'Resolución de problemas',
    'Trabajo en equipo',
    'Adaptabilidad',
    'Comunicación',
    'Liderazgo',
  ],
};

// ── Island world positions ──────────────────
const ISLAND_POS = {
  sobremi:     { x:  0,  z:  0  },
  estudios:    { x: -22, z: -18 },
  tecnologias: { x:  22, z: -18 },
  experiencia: { x: -22, z:  18 },
  proyectos:   { x:  22, z:  18 },
  idiomas:     { x:  0,  z: -28 },
};

// ── Camera configs per island ───────────────
const CAM_CONFIGS = {
  overview:    { pos: new THREE.Vector3( 0,  55,  42), target: new THREE.Vector3( 0, 0,  -2) },
  sobremi:     { pos: new THREE.Vector3( 8,  16,  12), target: new THREE.Vector3( 0, 3.5, 0) },
  estudios:    { pos: new THREE.Vector3(-14, 14,  -8), target: new THREE.Vector3(-22, 3, -18) },
  tecnologias: { pos: new THREE.Vector3( 30, 14,  -8), target: new THREE.Vector3( 22, 3, -18) },
  experiencia: { pos: new THREE.Vector3(-14, 14,  28), target: new THREE.Vector3(-22, 3,  18) },
  proyectos:   { pos: new THREE.Vector3( 30, 14,  28), target: new THREE.Vector3( 22, 3,  18) },
  idiomas:     { pos: new THREE.Vector3(  8, 14, -18), target: new THREE.Vector3(  0, 4, -28) },
};

// ── Label heights above ground ──────────────
const LABEL_HEIGHTS = {
  sobremi: 9, estudios: 8.5, tecnologias: 10,
  experiencia: 8.5, proyectos: 9.5, idiomas: 9,
};

// ── Internationalisation ─────────────────────
const I18N = (() => {
  let _cur = 'es';

  const _s = {
    es: {
      ui: {
        intro_tag: 'Portfolio Interactivo',
        intro_hint: 'Haz clic en una isla para explorarla',
        intro_btn: 'Explorar →',
        hint_click: 'Haz clic en la isla para ver más',
        nav_overview: 'General',       nav_sobremi: 'Sobre mí',
        nav_estudios: 'Estudios',      nav_tecnologias: 'Tech',
        nav_experiencia: 'Experiencia',nav_proyectos: 'Proyectos',
        nav_idiomas: 'Idiomas',
        lbl_overview: 'Vista general', lbl_sobremi: 'Sobre mí',
        lbl_estudios: 'Estudios',      lbl_tecnologias: 'Tecnologías',
        lbl_experiencia: 'Experiencia',lbl_proyectos: 'Proyectos',
        lbl_idiomas: 'Idiomas',
      },
      m: {
        sobremi:     { ey: 'Hello world',  ti: 'Ayman Sbay Zekkari' },
        estudios:    { ey: 'Formación',    ti: 'Estudios' },
        tecnologias: { ey: 'Stack',        ti: 'Tecnologías' },
        experiencia: { ey: 'Trayectoria',  ti: 'Experiencia' },
        proyectos:   { ey: 'Work',         ti: 'Proyectos' },
        idiomas:     { ey: 'Comunicación', ti: 'Idiomas' },
      },
      s: {
        soft_skills: 'Habilidades personales',
        contact: 'Contacto', email_l: 'Email',
        phone_l: 'Teléfono', loc_l: 'Ubicación', mob_l: 'Movilidad',
        certificates: 'Certificados',
        frontend: 'Frontend', backend: 'Backend',
        db_tools: 'Bases de datos & herramientas',
        level: 'Nivel', advanced: 'Avanzado', intermediate: 'Intermedio',
        resp: 'Responsabilidades', other_exp: 'Otras experiencias',
        more_coming: 'Más proyectos en camino', check_back: 'Vuelve pronto',
        view_proj: 'Ver proyecto →',
        lang_note: '4 idiomas: ventaja clave para equipos internacionales y proyectos multilingüe.',
      },
      d: {
        about: 'Desarrollador de aplicaciones web con experiencia en backend, formado en Institut Sa Palomera. Antes de tech trabajé en hostelería y logística — eso me dio habilidades reales de liderazgo, adaptabilidad y comunicación bajo presión.',
        skills: ['Resolución de problemas', 'Trabajo en equipo', 'Adaptabilidad', 'Comunicación', 'Liderazgo'],
        edu: [
          { date: '2022 – 2024', name: 'Institut Sa Palomera',          desc: 'FP en Desarrollo de Aplicaciones Web (DAW). Arquitectura web, bases de datos y desarrollo completo front-end + back-end desde cero, con certificados en cada tecnología.' },
          { date: 'Hasta 2020',  name: 'Escola Vedruna Malgrat de Mar', desc: 'Bachillerato. Base académica previa a la formación técnica.' },
        ],
        exp_desc: 'Desarrollo de sistema ERP completo. Backend PHP + CodeIgniter, integración frontend y optimización de rendimiento de aplicación.',
        resp: ['Backend ERP con PHP y CodeIgniter', 'Integración frontend con backend', 'Optimización de rendimiento e integridad de datos', 'Code reviews y knowledge sharing'],
        other: [
          { name: 'Carrefour',    desc: 'Reponedor — 2 temporadas de verano' },
          { name: 'Bimbo',        desc: 'Repartidor + liderazgo de equipo — +1 año' },
          { name: 'Hotel Marsol', desc: 'Camarero — temporada de verano' },
        ],
        proj_desc: 'Proyecto actual en desarrollo. Visítalo en vivo para explorar las funcionalidades.',
        langs: [
          { flag: '🇪🇸', name: 'Español',  level: 'Nivel nativo' },
          { flag: '🏴󠁥󠁳󠁣󠁴󠁿', name: 'Catalán',  level: 'Nivel nativo' },
          { flag: '🇬🇧', name: 'Inglés',   level: 'Nivel alto' },
          { flag: '🇲🇦', name: 'Árabe',    level: 'Nivel alto' },
        ],
      },
    },

    en: {
      ui: {
        intro_tag: 'Interactive Portfolio',
        intro_hint: 'Click on an island to explore it',
        intro_btn: 'Explore →',
        hint_click: 'Click the island to see more',
        nav_overview: 'Overview',      nav_sobremi: 'About me',
        nav_estudios: 'Education',     nav_tecnologias: 'Tech',
        nav_experiencia: 'Experience', nav_proyectos: 'Projects',
        nav_idiomas: 'Languages',
        lbl_overview: 'Overview',      lbl_sobremi: 'About me',
        lbl_estudios: 'Education',     lbl_tecnologias: 'Technologies',
        lbl_experiencia: 'Experience', lbl_proyectos: 'Projects',
        lbl_idiomas: 'Languages',
      },
      m: {
        sobremi:     { ey: 'Hello world',   ti: 'Ayman Sbay Zekkari' },
        estudios:    { ey: 'Training',      ti: 'Education' },
        tecnologias: { ey: 'Stack',         ti: 'Technologies' },
        experiencia: { ey: 'Career',        ti: 'Experience' },
        proyectos:   { ey: 'Work',          ti: 'Projects' },
        idiomas:     { ey: 'Communication', ti: 'Languages' },
      },
      s: {
        soft_skills: 'Personal skills',
        contact: 'Contact', email_l: 'Email',
        phone_l: 'Phone', loc_l: 'Location', mob_l: 'Mobility',
        certificates: 'Certificates',
        frontend: 'Frontend', backend: 'Backend',
        db_tools: 'Databases & tools',
        level: 'Level', advanced: 'Advanced', intermediate: 'Intermediate',
        resp: 'Responsibilities', other_exp: 'Other experience',
        more_coming: 'More projects coming soon', check_back: 'Check back soon',
        view_proj: 'View project →',
        lang_note: '4 languages: a key advantage for international teams and multilingual projects.',
      },
      d: {
        about: 'Web application developer with backend experience, trained at Institut Sa Palomera. Before tech I worked in hospitality and logistics — that gave me real skills in leadership, adaptability and communication under pressure.',
        skills: ['Problem solving', 'Teamwork', 'Adaptability', 'Communication', 'Leadership'],
        edu: [
          { date: '2022 – 2024', name: 'Institut Sa Palomera',          desc: 'Vocational training in Web Application Development (DAW). Web architecture, databases and full-stack development from scratch, with certificates in each technology.' },
          { date: 'Until 2020',  name: 'Escola Vedruna Malgrat de Mar', desc: 'High school diploma. Academic base prior to technical training.' },
        ],
        exp_desc: 'Development of a complete ERP system. PHP + CodeIgniter backend, frontend integration and application performance optimization.',
        resp: ['ERP backend with PHP and CodeIgniter', 'Frontend-backend integration', 'Performance optimization and data integrity', 'Code reviews and knowledge sharing'],
        other: [
          { name: 'Carrefour',    desc: 'Stocker — 2 summer seasons' },
          { name: 'Bimbo',        desc: 'Delivery driver + team leadership — +1 year' },
          { name: 'Hotel Marsol', desc: 'Waiter — summer season' },
        ],
        proj_desc: 'Current project under development. Visit it live to explore the features.',
        langs: [
          { flag: '🇪🇸', name: 'Spanish', level: 'Native level' },
          { flag: '🏴󠁥󠁳󠁣󠁴󠁿', name: 'Catalan', level: 'Native level' },
          { flag: '🇬🇧', name: 'English', level: 'High level' },
          { flag: '🇲🇦', name: 'Arabic',  level: 'High level' },
        ],
      },
    },

    ca: {
      ui: {
        intro_tag: 'Portfolio Interactiu',
        intro_hint: 'Fes clic en una illa per explorar-la',
        intro_btn: 'Explorar →',
        hint_click: "Fes clic a l'illa per veure més",
        nav_overview: 'General',        nav_sobremi: 'Sobre mi',
        nav_estudios: 'Estudis',        nav_tecnologias: 'Tech',
        nav_experiencia: 'Experiència', nav_proyectos: 'Projectes',
        nav_idiomas: 'Idiomes',
        lbl_overview: 'Vista general',  lbl_sobremi: 'Sobre mi',
        lbl_estudios: 'Estudis',        lbl_tecnologias: 'Tecnologies',
        lbl_experiencia: 'Experiència', lbl_proyectos: 'Projectes',
        lbl_idiomas: 'Idiomes',
      },
      m: {
        sobremi:     { ey: 'Hello world', ti: 'Ayman Sbay Zekkari' },
        estudios:    { ey: 'Formació', ti: 'Estudis' },
        tecnologias: { ey: 'Stack',       ti: 'Tecnologies' },
        experiencia: { ey: 'Trajectòria', ti: 'Experiència' },
        proyectos:   { ey: 'Work',        ti: 'Projectes' },
        idiomas:     { ey: 'Comunicació', ti: 'Idiomes' },
      },
      s: {
        soft_skills: 'Habilitats personals',
        contact: 'Contacte', email_l: 'Correu electrònic',
        phone_l: 'Telèfon', loc_l: 'Ubicació', mob_l: 'Mobilitat',
        certificates: 'Certificats',
        frontend: 'Frontend', backend: 'Backend',
        db_tools: 'Bases de dades i eines',
        level: 'Nivell', advanced: 'Avançat', intermediate: 'Intermedi',
        resp: 'Responsabilitats', other_exp: 'Altres experiències',
        more_coming: 'Més projectes en camí', check_back: 'Torna aviat',
        view_proj: 'Veure projecte →',
        lang_note: '4 idiomes: avantatge clau per a equips internacionals i projectes multilingües.',
      },
      d: {
        about: "Desenvolupador d'aplicacions web amb experiència en backend, format a l'Institut Sa Palomera. Abans de la tecnologia vaig treballar en hostaleria i logística — això em va donar habilitats reals de lideratge, adaptabilitat i comunicació sota pressió.",
        skills: ['Resolució de problemes', 'Treball en equip', 'Adaptabilitat', 'Comunicació', 'Lideratge'],
        edu: [
          { date: '2022 – 2024', name: 'Institut Sa Palomera',          desc: "FP en Desenvolupament d'Aplicacions Web (DAW). Arquitectura web, bases de dades i desenvolupament complet front-end + back-end des de zero, amb certificats en cada tecnologia." },
          { date: 'Fins al 2020', name: 'Escola Vedruna Malgrat de Mar', desc: 'Batxillerat. Base acadèmica prèvia a la formació tècnica.' },
        ],
        exp_desc: "Desenvolupament de sistema ERP complet. Backend PHP + CodeIgniter, integració frontend i optimització del rendiment de l'aplicació.",
        resp: ['Backend ERP amb PHP i CodeIgniter', 'Integració frontend amb backend', 'Optimització del rendiment i integritat de dades', 'Code reviews i knowledge sharing'],
        other: [
          { name: 'Carrefour',    desc: "Reposador — 2 temporades d'estiu" },
          { name: 'Bimbo',        desc: "Repartidor + lideratge d'equip — +1 any" },
          { name: 'Hotel Marsol', desc: "Cambrer — temporada d'estiu" },
        ],
        proj_desc: "Projecte actual en desenvolupament. Visita'l en viu per explorar les funcionalitats.",
        langs: [
          { flag: '🇪🇸', name: 'Espanyol', level: 'Nivell natiu' },
          { flag: '🏴󠁥󠁳󠁣󠁴󠁿', name: 'Català', level: 'Nivell natiu' },
          { flag: '🇬🇧', name: 'Anglès', level: 'Nivell alt' },
          { flag: '🇲🇦', name: 'Àrab',   level: 'Nivell alt' },
        ],
      },
    },
  };

  function ui(k)   { return (_s[_cur]||_s.es).ui[k]  || _s.es.ui[k]  || k; }
  function sec(k)  { return (_s[_cur]||_s.es).s[k]   || _s.es.s[k]   || k; }
  function modal(k){ return (_s[_cur]||_s.es).m[k]   || _s.es.m[k]; }
  function data(k) { const v = (_s[_cur]||_s.es).d[k]; return v !== undefined ? v : _s.es.d[k]; }
  function set(l)  { if (_s[l]) _cur = l; }
  function get()   { return _cur; }

  return { ui, sec, modal, data, set, get };
})();
