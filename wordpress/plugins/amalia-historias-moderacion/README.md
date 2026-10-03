# Plugin WordPress: Amalia Historias — Moderación Rápida y REST API

Este plugin añade herramientas avanzadas de moderación para el Custom Post Type **`amalia_historia`** en WordPress y gestiona los endpoints oficiales de la **REST API** para la integración con el sitio web en Astro.

---

## 🚀 Características Principales

1. **Aprobación en 1 Clic (AJAX sin recargar pantalla):**
   - **`Aprobar`**: Botón verde con ícono de checkmark (`dashicons-yes`) para historias en estado `Pendiente` o `Borrador`. Al presionarlo, aprueba y publica al instante.
   - **`Pasar a Borrador`**: Si la historia ya está aprobada, muestra el botón en **rojo tomate / naranja deslavado bonito** (`#ea6347`) con ícono de edición/lápiz (`dashicons-edit`), evitando duplicidad de ojos.
   - Tres badges visuales claros: **Pendiente** (amarillo suave), **Aprobada** (verde menta) y **Borrador** (naranja/tomate suave).

2. **Acciones Homogéneas por Fila (Estándar 30×30px sin competir entre sí):**
   - **`[ ✓ ]` o `[ ✎ ]` (Aprobar / Borrador):** Alterna el estado de publicación con tonalidades armónicas.
   - **`[ 👁️ ]` (Leer historia):** Único ícono de ojo, en azul suave. Abre el modal de lectura con el texto completo y los metadatos ACF (Autor, Edad, Ciudad, Categoría).
   - **`[ ⌫ ]` (Goma de Borrar):** Ícono vectorial de goma de borrar en rojo vino suave para enviar la historia a la papelera tras confirmación rápida.
   - **Modal de Lectura:** El botón de acción principal alterna entre `Aprobar` (verde) y `Pasar a Borrador` (rojo tomate) con **texto en blanco puro (#ffffff) de máxima legibilidad**.

3. **Acciones por Lote Nativas (Bulk Actions):**
   - Integrado en el menú desplegable nativo de WordPress *"Acciones en lote"*:
     - `✅ Aprobar y Publicar seleccionadas`
     - `⏸️ Mover a Borrador seleccionadas`
   - Permite seleccionar 10, 20 o más historias con las casillas de verificación y moderarlas en un solo clic.

4. **Widget en el Escritorio de WordPress (Dashboard):**
   - En la página principal del panel de administración (`wp-admin/index.php`) se agrega el módulo:
     **💬 Historias de Lectores — Moderación Rápida**.
   - Muestra un badge con el contador en vivo: `X pendientes de moderar`.
   - Lista las **últimas 20 historias** priorizando las que están en estado `pending`.
   - Cuenta con casillas de verificación y el botón **`✓ Aprobar seleccionadas`** para moderar directo desde la portada sin ir al menú del CPT.

5. **REST API y CORS Integrados:**
   - Endpoint `POST /wp-json/amalia/v1/enviar-historia` (recepción de formularios en estado `pending`).
   - Endpoint `GET /wp-json/amalia/v1/historias` (entrega de historias aprobadas).
   - Manejo transparente de CORS y preflight `OPTIONS` con respuesta 200.
   - **Compatibilidad protegida:** Si aún tienes activo el snippet anterior en el plugin *Code Snippets*, el plugin detecta las funciones y evita cualquier error de colisión.

---

## 📦 Instrucciones de Instalación

### Método 1: Subir archivo ZIP (Recomendado)
1. Comprime la carpeta `amalia-historias-moderacion` en un archivo `.zip`:
   - El archivo resultante debe ser: `amalia-historias-moderacion.zip`.
2. Entra a tu panel de WordPress (`/wp-admin`).
3. Ve a **Plugins > Añadir nuevo plugin > Subir plugin**.
4. Selecciona el archivo `amalia-historias-moderacion.zip` y haz clic en **Instalar ahora**.
5. Haz clic en **Activar plugin**.

> **Nota si usas el plugin *Code Snippets*:**  
> Una vez activado este plugin, puedes **desactivar los snippets antiguos** de columnas y REST API en *Code Snippets*, ya que este plugin asume todas esas funciones de forma centralizada y optimizada.

### Método 2: Vía FTP o Administrador de Archivos (cPanel)
1. Sube la carpeta `amalia-historias-moderacion` al directorio:
   `wp-content/plugins/amalia-historias-moderacion/`
2. Ve a **Plugins > Plugins instalados** en WordPress.
3. Busca **Amalia Historias — Moderación Rápida y REST API** y haz clic en **Activar**.

---

## 📂 Estructura de Archivos del Plugin

```text
amalia-historias-moderacion/
├── amalia-historias-moderacion.php  # Lógica principal, hooks, bulk actions, widget y endpoints
├── README.md                        # Esta documentación
└── assets/
    ├── css/
    │   └── admin-moderacion.css     # Estilos de badges, tabla de widget y modal flotante
    └── js/
        └── admin-moderacion.js      # Controlador de eventos AJAX, modal y bulk approval
```

---

## 🛡️ Aislamiento con el Frontend (Astro)

Este plugin se encuentra en la carpeta `/wordpress/plugins/` en la raíz del repositorio:
- **No es procesado por Astro:** Astro únicamente compila las carpetas `src/` y `public/`.
- **Cero impacto en el build:** Al ejecutar `npm run build`, la carpeta `dist/` resultante para ChemiCloud permanece 100% limpia y sin archivos residuales de WordPress.
