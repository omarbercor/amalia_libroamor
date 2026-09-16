# 00 — Núcleo del Sistema IA (Project Core) — Amalia 10 Años

**Directrices Universales del Workspace.** Todos los agentes IA y desarrolladores subordinan su comportamiento a este archivo de forma absoluta. En caso de conflicto entre este documento y cualquier otro, este documento prevalece.

---

## Jerarquía de Autoridad de Documentos

```
.ai/00_project_core.md              ← Ley Suprema (este archivo)
.ai/01_planning_and_architecture.md ← Arquitectura frontend Astro y contratos Headless
.ai/active_context.md               ← Estado vivo del sprint y memoria de trabajo
.ai/roles/*.md                      ← Reglas locales por especialidad
```

---

## 1. Protocolo de Inicio de Sesión (Onboarding Obligatorio)

Antes de ejecutar cualquier tarea:
1. **Leer `active_context.md`**: Entender el estado actual, avances y próximos pasos.
2. **Consultar el rol activo**: Operar bajo las directrices del rol correspondiente en `.ai/roles/`.
3. **Respetar la Fidelidad Visual**: La estética artesanal (libreta de apuntes, trazos de plumón rojo, polaroids y elementos orgánicos de Amalia Andrade) es innegociable.

---

## 2. Principios de Ingeniería Universales

### 2.1 Rendimiento Extremo (>90% Core Web Vitals)
- HTML semántico y puro generado por Astro con 0 JS innecesario.
- Los scripts interactivos (Canvas del plumón, carrusel, iPod, filtros) se encapsulan como islas o componentes modulares de alto desempeño sin bloquear el hilo principal (LCP < 2.0s, CLS = 0).

### 2.2 Fidelidad Estética Absoluta ("Look & Feel" Artesanal)
- Cada trazo, subrayado, botón y tarjeta debe reflejar fielmente las pantallas de referencia de `Referencias/`.
- La experiencia del plumón rojo (inspirada en Brad Arnett) debe sentirse natural, con física de tinta suave, transparencia y mezcla con el fondo de papel.

### 2.3 Contratos Desacoplados (Headless Ready)
- Los datos de historias de usuarios y multimedia viven en archivos JSON locales (`stories.json` y `multimedia.json`) con una estructura 100% idéntica a la respuesta esperada de los CPTs de WordPress REST API. Cuando se conecte WordPress, solo se cambiará la fuente de datos.

### 2.4 Cero Placeholders
- No se permiten textos `Lorem Ipsum` ni componentes a medio hacer. Todo debe tener contenido contextual y conmemorativo real alineado al libro y a Amalia Andrade.

---

## 3. Definition of Done (Criterios de Cierre de Tarea)

Una tarea está completada únicamente si:
- [ ] La interfaz coincide con las pantallas de referencia en Desktop y Mobile.
- [ ] No existen errores ni advertencias en la consola del navegador.
- [ ] Las animaciones y trazos son fluidos (60 FPS sin jank).
- [ ] El código compila limpiamente (`npm run build`).
- [ ] `active_context.md` ha sido actualizado con los avances reales.
