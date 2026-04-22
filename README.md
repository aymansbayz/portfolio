# Ayman Sbay — Portfolio 3D Interactivo

Portfolio personal con mapa de islas low-poly 3D navegable, construido con Three.js puro.

## Estructura del proyecto

```
portfolio/
├── index.html                  ← HTML shell (sin JS ni CSS inline)
├── css/
│   ├── base.css                ← Reset, variables CSS, canvas
│   ├── ui.css                  ← HUD, nav, labels, intro, hints
│   └── modals.css              ← Paneles de contenido (modales)
├── js/
│   ├── models/
│   │   └── data.js             ← Todos los datos del portfolio + config de cámara/islas
│   ├── views/
│   │   ├── worldBuilder.js     ← Construcción de la escena 3D (islas, árboles, puentes...)
│   │   └── modalRenderer.js    ← Genera el HTML de cada modal a partir de data.js
│   ├── controllers/
│   │   ├── cameraController.js ← Animación de cámara, fly-to, raycasting, labels
│   │   └── modalController.js  ← Abrir / cerrar / backdrop click modales
│   └── main.js                 ← Entry point: renderer, loop, wiring MVC
└── assets/                     ← (vacío — listo para imágenes, futuros recursos)
```

## Cómo usar

Abre `index.html` en un servidor local (no vale file:// por las restricciones CORS de los módulos).

```bash

# Con Node
npx serve .
```

Luego abre `http://localhost:8080` en el navegador.

## Añadir un proyecto nuevo

1. Edita `js/models/data.js` → array `proyectos`
2. Añade un objeto `{ name, desc, url }`
3. El render es automático — `ModalRenderer` lo pinta solo

## Cambiar datos personales

Edita únicamente `js/models/data.js` → objeto `personal`.

## Tecnologías

- [Three.js r128](https://threejs.org/) — 3D WebGL
- [Outfit + DM Serif Display](https://fonts.google.com/) — tipografía
- Vanilla JS (ES6, sin bundler, sin dependencias extra)
