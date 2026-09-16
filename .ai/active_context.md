# Active Context — Amalia 10 Años

## 1. Estado Actual del Proyecto
- **Sprint Activo**: Sprint 1 — Maquetación, Estética Artesanal e Interactividad Frontend (Astro).
- **Fase**: Fase 1 Completada con Éxito (Frontend Interactivo en Astro + HTML/CSS + GSAP + Canvas).
- **Última Actualización**: 2026-09-15.

## 2. Objetivos del Sprint
1. [x] Análisis del Playbook AI-Native y adopción de directrices en `.ai/`.
2. [x] Inspección detallada de las referencias visuales en `/Referencias`.
3. [x] Análisis del CodePen de Brad Arnett (`XyZKaG`) y diseño de la adaptación del plumón rojo.
4. [x] Inicialización del proyecto Astro y dependencias (`gsap`).
5. [x] Creación del sistema de diseño (tokens de color, fuentes artesanales, texturas de papel y doodles SVG).
6. [x] Implementación de la experiencia interactiva del plumón rojo en el Home (`CanvasMarker.astro`).
7. [x] Maquetación de páginas secundarias:
   - `/por-otro-amor` (Muro de historias, filtros, búsqueda en vivo, hoja de libreta rasgada y modal).
   - `/o-por-otra-vida` (Carrusel multimedia interactivo, iPod retro con audio/scrubber, Sobre Amalia con cinta roja brillante).
   - `/compra` (Países interactivos en 3 columnas Desktop / 1 columna Mobile).
8. [x] Verificación de rendimiento, fidelidad visual y responsive con subagente de navegador y capturas de pantalla.

## 3. Decisiones Recientes
- Se respetó la arquitectura desacoplada para permitir futura integración con WordPress REST API mediante `src/data/stories.json` y `src/data/multimedia.json`.
- El motor de dibujo interactivo utiliza Canvas 2D con curvas Bézier y `mix-blend-mode: multiply` para lograr absorción de tinta roja realista sobre papel sin impactar el rendimiento.
- El iPod Classic cuenta con síntesis web audio y scrubber reactivo.

## 4. Próximos Pasos (Etapa Futura)
- Adaptación del backend en WordPress (cPanel/WHM) para recepción de historias mediante CPT `historias` (status `pending` para moderación humana) y CPT `multimedia`.
- Sustitución de `stories.json` y `multimedia.json` por llamadas `fetch()` a la REST API de WordPress.
