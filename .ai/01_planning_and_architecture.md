# 01 — Planeación y Arquitectura: Amalia 10 Años

## 1. Visión del Producto
Sitio web conmemorativo por los 10 años del libro *"Uno siempre cambia al amor de su vida (por otro amor o por otra vida)"* de **Amalia Andrade**. Experiencia visual interactiva estilo libreta de apuntes, con trazos de plumón rojo, notas flotantes, carrusel multimedia retro y lienzos de dibujo en tiempo real.

## 2. Decisiones de Arquitectura (ADRs)

### ADR-01: Frontend con Astro + HTML/Vanilla CSS + GSAP
- **Contexto**: Se requiere máxima velocidad (Core Web Vitals > 90%), estética única y transiciones fluidas sin la sobrecarga de frameworks monolíticos pesados.
- **Decisión**: Astro como generador SSG con renderizado estático de páginas e hidratación selectiva de interactividades. Vanilla CSS con variables de diseño tokens para flexibilidad artesanal total.
- **Consecuencias**: Cero overhead de JS en la estructura base, carga instantánea y control total de estilos.

### ADR-02: Motor de Dibujo con Plumón Rojo (Canvas 2D)
- **Contexto**: Se busca trasladar la experiencia analógica del marcador de punta de fieltro a la pantalla, permitiendo al usuario intervenir la libreta.
- **Decisión**: Canvas HTML5 2D con interpolación de trazo por curvas de Bézier cuadráticas, `mix-blend-mode: multiply`, opacidad de tinta realista (`#D32F2F`) y cursor con rotación dinámica e inclinación física.
- **Consecuencias**: Experiencia inmersiva que recrea la acción del plumón sobre papel sin perjudicar los FPS.

### ADR-03: Mock Data con Formato WordPress REST API
- **Contexto**: La Etapa 1 es frontend estático en Astro, y en una etapa posterior se integrará con WordPress Headless (cPanel/WHM) con CPTs `historias` y `multimedia`.
- **Decisión**: Modelar los archivos `src/data/stories.json` y `src/data/multimedia.json` con las propiedades estándar de la REST API de WordPress (`id`, `date`, `title.rendered`, `content.rendered`, `acf: { categoria, autor, ubicacion, tipo_media, url_media, caption }`).
- **Consecuencias**: Transición a WordPress sin tocar ni una sola línea de los componentes visuales de Astro.

## 3. Estructura de Rutas
- `/`: Home interactivo con portada conmemorativa y lienzo del plumón rojo.
- `/por-otro-amor`: Muro de historias ("Lo que este libro me ha provocado"), filtros, buscador y formulario estilo papel rasgado.
- `/o-por-otra-vida`: Carrusel multimedia ("Cosas que no están en el libro pero deberían estar"), iPod Classic interactivo y sección "Sobre Amalia".
- `/compra`: Directorio interactivo de compra por países ("Activa el super poder de compra").
