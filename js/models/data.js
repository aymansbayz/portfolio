// ═══════════════════════════════════════════════
//  MODEL — portfolio data & island configuration
// ═══════════════════════════════════════════════
'use strict';

const PortfolioData = {

  // ── Personal info ──────────────────────────
  personal: {
    name:     'Ayman Sbay Zekkari',
    role:     'Web Application Developer · Backend',
    location: 'Blanes de Mar, Girona, España',
    email:    'ayman.zekkari2@gmail.com',
    phone:    '+34 691 717 544',
    license:  'Carnet de conducir válido',
    about:    'Desarrollador de aplicaciones web con experiencia en backend, formado en Institut Sa Palomera. Antes de tech trabajé en hostelería y logística — eso me dio habilidades reales de liderazgo, adaptabilidad y comunicación bajo presión.',
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
      desc: 'Proyecto actual en desarrollo. Visítalo en vivo para explorar las funcionalidades.',
      url:  'https://coral-raven-610098.hostingersite.com/gleam',
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
