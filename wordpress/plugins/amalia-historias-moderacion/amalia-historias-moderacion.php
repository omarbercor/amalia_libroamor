<?php
/**
 * Plugin Name: Amalia Historias — Moderación Rápida y REST API
 * Plugin URI:  https://unosiemprecambia.com
 * Description: Sistema de moderación rápida (modal de lectura, aprobación en 1-clic con AJAX, acciones por lotes y widget de escritorio) más endpoints oficiales REST API para el muro de historias de Amalia Andrade (10 Años).
 * Version:     1.0.0
 * Author:      Equipo Amalia 10 Años
 * Author URI:  https://unosiemprecambia.com
 * License:     GPLv2 or later
 * Text Domain: amalia-historias
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AMALIA_MOD_VERSION', '1.1.0');
define('AMALIA_MOD_PATH', plugin_dir_path(__FILE__));
define('AMALIA_MOD_URL', plugin_dir_url(__FILE__));

// =========================================================================
// 1. CARGA DE ASSETS (CSS Y JAVASCRIPT EN WP-ADMIN)
// =========================================================================
add_action('admin_enqueue_scripts', function($hook) {
    global $post_type;

    $is_cpt_page  = ($hook === 'edit.php' && $post_type === 'amalia_historia');
    $is_dashboard = ($hook === 'index.php');

    if ($is_cpt_page || $is_dashboard) {
        wp_enqueue_style(
            'amalia-admin-moderacion-css',
            AMALIA_MOD_URL . 'assets/css/admin-moderacion.css',
            array(),
            AMALIA_MOD_VERSION
        );

        wp_enqueue_script(
            'amalia-admin-moderacion-js',
            AMALIA_MOD_URL . 'assets/js/admin-moderacion.js',
            array('jquery'),
            AMALIA_MOD_VERSION,
            true
        );

        wp_localize_script('amalia-admin-moderacion-js', 'amaliaModeracion', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('amalia_moderacion_nonce'),
        ));
    }
});

// =========================================================================
// 2. COLUMNAS PERSONALIZADAS EN EL CPT (amalia_historia)
// =========================================================================
add_filter('manage_amalia_historia_posts_columns', function($columns) {
    $new_columns = array();
    $new_columns['cb']                           = $columns['cb']; // Checkbox nativo
    $new_columns['title']                        = 'Historia / Título';
    $new_columns['autor_nombre']                 = 'Nombre';
    $new_columns['autor_edad']                   = 'Edad';
    $new_columns['autor_ciudad']                 = 'Ciudad';
    $new_columns['taxonomy-categoria_historia']  = 'Categoría';
    $new_columns['historia_status']              = 'Estado y Moderación';
    $new_columns['date']                         = 'Fecha';

    return $new_columns;
});

add_action('manage_amalia_historia_posts_custom_column', function($column, $post_id) {
    switch ($column) {
        case 'autor_nombre':
            $nombre = function_exists('get_field') ? get_field('autor_nombre', $post_id) : '';
            if (!$nombre) {
                $nombre = get_post_meta($post_id, 'autor_nombre', true);
            }
            echo $nombre ? esc_html($nombre) : '<span style="color:#aaa;">—</span>';
            break;

        case 'autor_edad':
            $edad = function_exists('get_field') ? get_field('autor_edad', $post_id) : '';
            if (!$edad) {
                $edad = get_post_meta($post_id, 'autor_edad', true);
            }
            echo $edad ? esc_html($edad) : '<span style="color:#aaa;">—</span>';
            break;

        case 'autor_ciudad':
            $ciudad = function_exists('get_field') ? get_field('autor_ciudad', $post_id) : '';
            if (!$ciudad) {
                $ciudad = get_post_meta($post_id, 'autor_ciudad', true);
            }
            echo $ciudad ? esc_html($ciudad) : '<span style="color:#aaa;">—</span>';
            break;

        case 'historia_status':
            $status   = get_post_status($post_id);
            $post_obj = get_post($post_id);
            $content  = $post_obj ? $post_obj->post_content : '';
            $title    = get_the_title($post_id);

            $autor  = function_exists('get_field') ? get_field('autor_nombre', $post_id) : get_post_meta($post_id, 'autor_nombre', true);
            $edad   = function_exists('get_field') ? get_field('autor_edad', $post_id) : get_post_meta($post_id, 'autor_edad', true);
            $ciudad = function_exists('get_field') ? get_field('autor_ciudad', $post_id) : get_post_meta($post_id, 'autor_ciudad', true);

            $terms = get_the_terms($post_id, 'categoria_historia');
            $cat_nombre = (!empty($terms) && !is_wp_error($terms)) ? $terms[0]->name : 'Sin categoría';

            echo '<div class="amalia-status-cell" data-id="' . esc_attr($post_id) . '">';
            echo amalia_obtener_badge_html($status);

            echo '<div class="amalia-action-buttons">';
            echo amalia_obtener_botones_acciones_html($post_id, $status, $title, $content, $autor, $edad, $ciudad, $cat_nombre);
            echo '</div>';

            echo '</div>';
            break;
    }
}, 10, 2);

add_filter('manage_edit-amalia_historia_sortable_columns', function($columns) {
    $columns['autor_nombre'] = 'autor_nombre';
    $columns['autor_edad']   = 'autor_edad';
    return $columns;
});

// Helpers para badges y botones
function amalia_obtener_badge_html($status) {
    switch ($status) {
        case 'publish':
            return '<span class="amalia-badge amalia-badge-publish">Aprobada</span>';
        case 'pending':
            return '<span class="amalia-badge amalia-badge-pending">Pendiente</span>';
        case 'draft':
            return '<span class="amalia-badge amalia-badge-draft">Borrador</span>';
        case 'trash':
            return '<span class="amalia-badge amalia-badge-trash">Eliminado</span>';
        default:
            return '<span class="amalia-badge amalia-badge-draft">' . esc_html(ucfirst($status)) . '</span>';
    }
}

// Ícono SVG de Goma de Borrar
function amalia_obtener_icon_goma_svg() {
    return '<svg class="amalia-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
         . '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path>'
         . '<path d="M22 21H7"></path>'
         . '<path d="m5 11 9 9"></path>'
         . '</svg>';
}

function amalia_obtener_botones_acciones_html($post_id, $status, $title = '', $content = '', $autor = '', $edad = '', $ciudad = '', $cat_nombre = '') {
    $html = '';

    // 1. Botón Aprobar (Verde) o Pasar a Borrador (Rojo Tomate / Naranja Deslavado)
    // Se usa dashicons-edit (lápiz) para borrador y dashicons-yes (check) para aprobar.
    // Esto elimina el doble ícono de ojo para evitar cualquier confusión con el botón de leer.
    if ($status === 'publish') {
        $html .= '<button type="button" class="amalia-btn amalia-btn-unpublish amalia-btn-ajax" data-id="' . esc_attr($post_id) . '" data-nuevo-estado="draft" title="Pasar a Borrador"><span class="dashicons dashicons-edit"></span></button>';
    } else {
        $html .= '<button type="button" class="amalia-btn amalia-btn-approve amalia-btn-ajax" data-id="' . esc_attr($post_id) . '" data-nuevo-estado="publish" title="Aprobar"><span class="dashicons dashicons-yes"></span></button>';
    }

    // 2. Botón Leer (Azul Enfoque) - El ÚNICO ícono de ojo para abrir el modal de lectura
    $html .= '<button type="button" class="amalia-btn amalia-btn-view amalia-open-modal" '
           . 'data-id="' . esc_attr($post_id) . '" '
           . 'data-title="' . esc_attr($title) . '" '
           . 'data-content="' . esc_attr($content) . '" '
           . 'data-autor="' . esc_attr($autor ?: 'Anónimo') . '" '
           . 'data-edad="' . esc_attr($edad ?: '—') . '" '
           . 'data-ciudad="' . esc_attr($ciudad ?: '—') . '" '
           . 'data-categoria="' . esc_attr($cat_nombre) . '" '
           . 'data-status="' . esc_attr($status) . '" '
           . 'title="Leer historia"><span class="dashicons dashicons-visibility"></span></button>';

    // 3. Botón Borrar (Goma de Borrar SVG)
    $html .= '<button type="button" class="amalia-btn amalia-btn-trash amalia-btn-ajax" '
           . 'data-id="' . esc_attr($post_id) . '" '
           . 'data-nuevo-estado="trash" '
           . 'title="Eliminar">' . amalia_obtener_icon_goma_svg() . '</button>';

    return $html;
}

// =========================================================================
// 3. ACCIONES EN LOTE NATIVAS (BULK ACTIONS)
// =========================================================================
add_filter('bulk_actions-edit-amalia_historia', function($bulk_actions) {
    $bulk_actions['amalia_bulk_publish'] = '✅ Aprobar y Publicar seleccionadas';
    $bulk_actions['amalia_bulk_draft']   = '⏸️ Mover a Borrador seleccionadas';
    return $bulk_actions;
});

add_filter('handle_bulk_actions-edit-amalia_historia', function($redirect_to, $doaction, $post_ids) {
    if (!in_array($doaction, array('amalia_bulk_publish', 'amalia_bulk_draft'))) {
        return $redirect_to;
    }

    $nuevo_estado = ($doaction === 'amalia_bulk_publish') ? 'publish' : 'draft';
    $modificados = 0;

    foreach ($post_ids as $post_id) {
        if (current_user_can('edit_post', $post_id)) {
            wp_update_post(array(
                'ID'          => $post_id,
                'post_status' => $nuevo_estado,
            ));
            $modificados++;
        }
    }

    $redirect_to = add_query_arg('amalia_bulk_modificados', $modificados, $redirect_to);
    $redirect_to = add_query_arg('amalia_bulk_tipo', $nuevo_estado, $redirect_to);

    return $redirect_to;
}, 10, 3);

// Notificación de éxito al ejecutar bulk action
add_action('admin_notices', function() {
    if (!empty($_GET['amalia_bulk_modificados'])) {
        $count = intval($_GET['amalia_bulk_modificados']);
        $tipo  = sanitize_text_field($_GET['amalia_bulk_tipo'] ?? 'publish');
        $accion_texto = ($tipo === 'publish') ? 'aprobadas y publicadas' : 'movidas a borrador';

        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>✓ Éxito:</strong> Se han ' . esc_html($accion_texto) . ' ' . $count . ' historia(s) correctamente.</p>';
        echo '</div>';
    }
});

// =========================================================================
// 4. WIDGET EN EL ESCRITORIO DE WORDPRESS (DASHBOARD)
// =========================================================================
add_action('wp_dashboard_setup', function() {
    wp_add_dashboard_widget(
        'amalia_historias_dashboard_widget',
        '💬 Historias de Lectores — Moderación Rápida',
        'amalia_render_dashboard_widget'
    );
});

function amalia_render_dashboard_widget() {
    // Contar cuántas historias pendientes existen
    $count_pendientes = wp_count_posts('amalia_historia')->pending ?? 0;

    // Obtener las últimas 20 historias (priorizando pendientes)
    $args = array(
        'post_type'      => 'amalia_historia',
        'post_status'    => array('pending', 'publish'),
        'posts_per_page' => 20,
        'orderby'        => array('post_status' => 'DESC', 'date' => 'DESC'),
    );
    $historias_query = new WP_Query($args);
    ?>
    <div class="amalia-dashboard-widget">
        <div class="amalia-dash-topbar">
            <div>
                <?php if ($count_pendientes > 0): ?>
                    <span class="amalia-dash-badge-counter"><?php echo intval($count_pendientes); ?> pendientes de moderar</span>
                <?php else: ?>
                    <span class="amalia-dash-badge-counter" style="background:#e7f7ed; color:#18794e; border-color:#c6ebd4;">0 pendientes</span>
                <?php endif; ?>
            </div>
            <div class="amalia-dash-bulk-wrap">
                <button type="button" class="button button-primary" id="amalia-dash-bulk-approve-btn">
                    ✓ Aprobar seleccionadas
                </button>
            </div>
        </div>

        <?php if ($historias_query->have_posts()): ?>
            <div style="max-height: 480px; overflow-y: auto;">
                <table class="amalia-dash-table">
                    <thead>
                        <tr>
                            <th style="width: 28px;">
                                <input type="checkbox" id="amalia-dash-select-all" title="Seleccionar todas las pendientes" />
                            </th>
                            <th>Historia y Autor</th>
                            <th>Categoría</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($historias_query->have_posts()): $historias_query->the_post();
                            $p_id    = get_the_ID();
                            $status  = get_post_status($p_id);
                            $content = get_the_content();
                            $title   = get_the_title();

                            $autor  = function_exists('get_field') ? get_field('autor_nombre', $p_id) : get_post_meta($p_id, 'autor_nombre', true);
                            $edad   = function_exists('get_field') ? get_field('autor_edad', $p_id) : get_post_meta($p_id, 'autor_edad', true);
                            $ciudad = function_exists('get_field') ? get_field('autor_ciudad', $p_id) : get_post_meta($p_id, 'autor_ciudad', true);

                            $terms = get_the_terms($p_id, 'categoria_historia');
                            $cat_nombre = (!empty($terms) && !is_wp_error($terms)) ? $terms[0]->name : 'Sin categoría';

                            $is_published = ($status === 'publish');
                        ?>
                            <tr id="amalia-dash-row-<?php echo esc_attr($p_id); ?>" <?php echo $is_published ? 'style="opacity:0.65;"' : ''; ?>>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        class="amalia-dash-cb" 
                                        value="<?php echo esc_attr($p_id); ?>" 
                                        <?php echo $is_published ? 'disabled' : ''; ?> 
                                    />
                                </td>
                                <td>
                                    <a 
                                        href="#" 
                                        class="amalia-dash-story-title amalia-open-modal"
                                        data-id="<?php echo esc_attr($p_id); ?>"
                                        data-title="<?php echo esc_attr($title); ?>"
                                        data-content="<?php echo esc_attr($content); ?>"
                                        data-autor="<?php echo esc_attr($autor ?: 'Anónimo'); ?>"
                                        data-edad="<?php echo esc_attr($edad ?: '—'); ?>"
                                        data-ciudad="<?php echo esc_attr($ciudad ?: '—'); ?>"
                                        data-categoria="<?php echo esc_attr($cat_nombre); ?>"
                                        data-status="<?php echo esc_attr($status); ?>"
                                    >
                                        <?php echo esc_html($title); ?>
                                    </a>
                                    <div class="amalia-dash-story-excerpt">
                                        <strong><?php echo esc_html($autor ?: 'Anónimo'); ?></strong>
                                        <?php if ($ciudad) echo ' (' . esc_html($ciudad) . ')'; ?>
                                        — <?php echo esc_html(wp_trim_words($content, 12, '...')); ?>
                                    </div>
                                </td>
                                <td>
                                    <span style="font-size: 11px; background:#f0f0f1; padding:2px 6px; border-radius:3px;">
                                        <?php echo esc_html($cat_nombre); ?>
                                    </span>
                                </td>
                                <td class="amalia-dash-status">
                                    <?php echo amalia_obtener_badge_html($status); ?>
                                </td>
                                <td class="amalia-dash-actions">
                                    <?php echo amalia_obtener_botones_acciones_html($p_id, $status, $title, $content, $autor, $edad, $ciudad, $cat_nombre); ?>
                                </td>
                            </tr>
                        <?php endwhile; wp_reset_postdata(); ?>
                    </tbody>
                </table>
            </div>
        <?php else: ?>
            <p style="padding: 15px 0; color: #646970;">No hay historias enviadas hasta el momento.</p>
        <?php endif; ?>

        <div class="amalia-dash-footer">
            <span style="color:#646970; font-size:12px;">Se muestran hasta 20 historias recientes.</span>
            <a href="<?php echo esc_url(admin_url('edit.php?post_type=amalia_historia')); ?>" class="button button-secondary">
                Ver todas las historias en el CPT &rarr;
            </a>
        </div>
    </div>
    <?php
}

// =========================================================================
// 5. HTML DEL MODAL FLOTANTE (INYECTADO EN EL FOOTER DEL ADMIN)
// =========================================================================
add_action('admin_footer', function() {
    global $hook_suffix, $post_type;
    $is_cpt_page  = ($hook_suffix === 'edit.php' && $post_type === 'amalia_historia');
    $is_dashboard = ($hook_suffix === 'index.php');

    if (!$is_cpt_page && !$is_dashboard) return;
    ?>
    <div id="amalia-modal-overlay" aria-hidden="true" role="dialog" aria-labelledby="amaliaModalTitle">
        <div class="amalia-modal-card">
            <div class="amalia-modal-header">
                <h3 class="amalia-modal-title" id="amaliaModalTitle">Detalle de la Historia</h3>
                <button type="button" class="amalia-modal-close-btn" aria-label="Cerrar modal">&times;</button>
            </div>

            <div class="amalia-modal-body">
                <div class="amalia-modal-meta-grid">
                    <div class="amalia-meta-field">
                        <strong>Autor:</strong>
                        <span id="amaliaModalAutor">—</span>
                    </div>
                    <div class="amalia-meta-field">
                        <strong>Edad:</strong>
                        <span id="amaliaModalEdad">—</span>
                    </div>
                    <div class="amalia-meta-field">
                        <strong>Ciudad:</strong>
                        <span id="amaliaModalCiudad">—</span>
                    </div>
                    <div class="amalia-meta-field">
                        <strong>Categoría:</strong>
                        <span id="amaliaModalCategoria">—</span>
                    </div>
                    <div class="amalia-meta-field" style="grid-column: span 2;">
                        <strong>Estado Actual:</strong>
                        <div id="amaliaModalStatus"></div>
                    </div>
                </div>

                <label style="font-weight:600; font-size:12px; color:#50575e; text-transform:uppercase; margin-bottom:6px; display:block;">
                    Historia Completa:
                </label>
                <div class="amalia-modal-story-box" id="amaliaModalContent"></div>
            </div>

            <div class="amalia-modal-footer">
                <div>
                    <button type="button" class="button button-link-delete amalia-btn-ajax" id="amaliaModalBtnTrash" data-nuevo-estado="trash" title="Eliminar definitivamente a la papelera">
                        <?php echo amalia_obtener_icon_goma_svg(); ?>
                        <span>Eliminar</span>
                    </button>
                </div>
                <div class="amalia-modal-footer-actions">
                    <button type="button" class="button button-secondary" data-modal-action="close">
                        Cerrar
                    </button>
                    <button type="button" class="button amalia-btn-ajax amalia-modal-btn-approve" id="amaliaModalBtnApprove" data-nuevo-estado="publish">
                        Aprobar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <?php
});

// =========================================================================
// 6. ENDPOINTS AJAX PARA MODERACIÓN INSTANTÁNEA
// =========================================================================
add_action('wp_ajax_amalia_cambiar_estado_historia', function() {
    check_ajax_referer('amalia_moderacion_nonce', 'nonce');

    if (!current_user_can('edit_posts')) {
        wp_send_json_error(array('message' => 'No tienes permisos suficientes.'));
    }

    $post_id      = intval($_POST['post_id'] ?? 0);
    $nuevo_estado = sanitize_text_field($_POST['nuevo_estado'] ?? 'publish');

    if (!$post_id || !in_array($nuevo_estado, array('publish', 'draft', 'pending', 'trash'))) {
        wp_send_json_error(array('message' => 'Parámetros no válidos.'));
    }

    if ($nuevo_estado === 'trash') {
        wp_trash_post($post_id);
    } else {
        wp_update_post(array(
            'ID'          => $post_id,
            'post_status' => $nuevo_estado,
        ));
    }

    $pendientes = wp_count_posts('amalia_historia')->pending ?? 0;

    $post_obj   = get_post($post_id);
    $content    = $post_obj ? $post_obj->post_content : '';
    $title      = get_the_title($post_id);
    $autor      = function_exists('get_field') ? get_field('autor_nombre', $post_id) : get_post_meta($post_id, 'autor_nombre', true);
    $edad       = function_exists('get_field') ? get_field('autor_edad', $post_id) : get_post_meta($post_id, 'autor_edad', true);
    $ciudad     = function_exists('get_field') ? get_field('autor_ciudad', $post_id) : get_post_meta($post_id, 'autor_ciudad', true);

    $terms = get_the_terms($post_id, 'categoria_historia');
    $cat_nombre = (!empty($terms) && !is_wp_error($terms)) ? $terms[0]->name : 'Sin categoría';

    wp_send_json_success(array(
        'estado'           => $nuevo_estado,
        'badge_html'       => amalia_obtener_badge_html($nuevo_estado),
        'btn_html'         => amalia_obtener_botones_acciones_html($post_id, $nuevo_estado, $title, $content, $autor, $edad, $ciudad, $cat_nombre),
        'pendientes_count' => intval($pendientes),
    ));
});

add_action('wp_ajax_amalia_aprobar_lote_historias', function() {
    check_ajax_referer('amalia_moderacion_nonce', 'nonce');

    if (!current_user_can('edit_posts')) {
        wp_send_json_error(array('message' => 'No tienes permisos suficientes.'));
    }

    $post_ids = isset($_POST['post_ids']) && is_array($_POST['post_ids']) ? array_map('intval', $_POST['post_ids']) : array();

    if (empty($post_ids)) {
        wp_send_json_error(array('message' => 'No se enviaron IDs válidos.'));
    }

    foreach ($post_ids as $p_id) {
        if (current_user_can('edit_post', $p_id)) {
            wp_update_post(array(
                'ID'          => $p_id,
                'post_status' => 'publish',
            ));
        }
    }

    $pendientes = wp_count_posts('amalia_historia')->pending ?? 0;

    wp_send_json_success(array(
        'aprobadas'        => count($post_ids),
        'pendientes_count' => intval($pendientes),
    ));
});

// =========================================================================
// 7. REST API OFICIAL (CORS Y ENDPOINTS)
// Protegido contra colisiones si aún existe el snippet en Code Snippets
// =========================================================================

// Preflight CORS OPTIONS
if (!has_action('init', 'amalia_cors_options_preflight')) {
    function amalia_cors_options_preflight() {
        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, X-Requested-With');
            header('Access-Control-Max-Age: 86400');
            status_header(200);
            exit();
        }
    }
    add_action('init', 'amalia_cors_options_preflight');
}

// Filtro CORS y Registro de Rutas
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, X-Requested-With');
        return $value;
    });

    if (!function_exists('amalia_guardar_historia')) {
        register_rest_route('amalia/v1', '/enviar-historia', array(
            'methods'             => array('POST', 'OPTIONS'),
            'callback'            => 'amalia_plugin_guardar_historia',
            'permission_callback' => '__return_true',
        ));
    }

    if (!function_exists('amalia_obtener_historias')) {
        register_rest_route('amalia/v1', '/historias', array(
            'methods'             => array('GET', 'OPTIONS'),
            'callback'            => 'amalia_plugin_obtener_historias',
            'permission_callback' => '__return_true',
        ));
    }
});

// Implementación interna protegida para evitar errores de funciones duplicadas
if (!function_exists('amalia_plugin_guardar_historia')) {
    function amalia_plugin_guardar_historia(WP_REST_Request $request) {
        if ($request->get_method() === 'OPTIONS') {
            return new WP_REST_Response(array('status' => 'ok'), 200);
        }

        $params = $request->get_json_params();
        if (empty($params)) {
            $params = $request->get_params();
        }

        $historia  = sanitize_textarea_field($params['historia'] ?? '');
        $autor     = sanitize_text_field($params['autor'] ?? 'Anónimo');
        $edad      = sanitize_text_field($params['edad'] ?? '');
        $ciudad    = sanitize_text_field($params['ciudad'] ?? '');
        $categoria = sanitize_text_field($params['categoria'] ?? '');
        $tipo      = sanitize_text_field($params['tipo'] ?? 'otro-amor');
        $cf_token  = sanitize_text_field($params['cf-turnstile-response'] ?? $params['turnstile_token'] ?? '');

        // Validación de Cloudflare Turnstile Anti-Spam
        $cf_secret = defined('AMALIA_TURNSTILE_SECRET_KEY') 
            ? AMALIA_TURNSTILE_SECRET_KEY 
            : '0x4AAAAAAFM_l3cWMqHJtrZYEOvbgxlQaic';

        if (!empty($cf_secret)) {
            if (empty($cf_token)) {
                return new WP_Error('captcha_requerido', 'Por favor completa la verificación de seguridad antes de enviar.', array('status' => 400));
            }

            $remote_ip = sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? '');
            $verify_response = wp_remote_post('https://challenges.cloudflare.com/turnstile/v0/siteverify', array(
                'body' => array(
                    'secret'   => $cf_secret,
                    'response' => $cf_token,
                    'remoteip' => $remote_ip,
                ),
                'timeout' => 15,
            ));

            if (is_wp_error($verify_response)) {
                return new WP_Error('captcha_error', 'No se pudo verificar la seguridad con Cloudflare.', array('status' => 500));
            }

            $verify_body = json_decode(wp_remote_retrieve_body($verify_response), true);
            if (empty($verify_body['success'])) {
                return new WP_Error('captcha_invalido', 'La verificación de seguridad ha fallado. Intenta de nuevo.', array('status' => 403));
            }
        }

        if (empty(trim($historia))) {
            return new WP_Error('sin_contenido', 'La historia no puede estar vacía.', array('status' => 400));
        }

        $post_id = wp_insert_post(array(
            'post_type'    => 'amalia_historia',
            'post_title'   => wp_trim_words($historia, 7, '...'),
            'post_content' => $historia,
            'post_status'  => 'pending',
        ));

        if (is_wp_error($post_id)) {
            return new WP_Error('error_guardado', 'No se pudo guardar la historia.', array('status' => 500));
        }

        update_post_meta($post_id, 'autor_nombre', $autor);
        update_post_meta($post_id, 'autor_edad', $edad);
        update_post_meta($post_id, 'autor_ciudad', $ciudad);

        if (function_exists('update_field')) {
            update_field('autor_nombre', $autor, $post_id);
            update_field('autor_edad', $edad, $post_id);
            update_field('autor_ciudad', $ciudad, $post_id);
        }

        if (!empty($categoria)) {
            wp_set_object_terms($post_id, $categoria, 'categoria_historia', true);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'message' => '¡Historia recibida con amor! Pasará a moderación.',
            'id'      => $post_id,
        ), 200);
    }
}

if (!function_exists('amalia_plugin_obtener_historias')) {
    function amalia_plugin_obtener_historias(WP_REST_Request $request) {
        if ($request->get_method() === 'OPTIONS') {
            return new WP_REST_Response(array('status' => 'ok'), 200);
        }

        $categoria = $request->get_param('categoria');
        $per_page  = $request->get_param('per_page') ? intval($request->get_param('per_page')) : 100;

        $args = array(
            'post_type'      => 'amalia_historia',
            'post_status'    => 'publish',
            'posts_per_page' => $per_page,
            'orderby'        => 'date',
            'order'          => 'DESC',
        );

        if (!empty($categoria) && $categoria !== 'TODAS') {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'categoria_historia',
                    'field'    => 'slug',
                    'terms'    => sanitize_title($categoria),
                ),
            );
        }

        $query = new WP_Query($args);
        $historias = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $post_id = get_the_ID();

                $terms = get_the_terms($post_id, 'categoria_historia');
                $categoria_nombre = (!empty($terms) && !is_wp_error($terms)) ? $terms[0]->name : '';
                $categoria_slug   = (!empty($terms) && !is_wp_error($terms)) ? $terms[0]->slug : '';

                $tipo = 'otro-amor';
                if (!empty($terms) && !is_wp_error($terms)) {
                    $term = $terms[0];
                    if ($term->parent != 0) {
                        $parent = get_term($term->parent, 'categoria_historia');
                        if ($parent && stripos($parent->name, 'otra vida') !== false) {
                            $tipo = 'otra-vida';
                        }
                    } elseif (stripos($term->name, 'otra vida') !== false) {
                        $tipo = 'otra-vida';
                    }
                }

                $autor  = function_exists('get_field') ? get_field('autor_nombre', $post_id) : get_post_meta($post_id, 'autor_nombre', true);
                $edad   = function_exists('get_field') ? get_field('autor_edad', $post_id) : get_post_meta($post_id, 'autor_edad', true);
                $ciudad = function_exists('get_field') ? get_field('autor_ciudad', $post_id) : get_post_meta($post_id, 'autor_ciudad', true);

                $firma_parts = array_filter(array($autor ?: 'Anónimo', $edad, $ciudad));
                $firma = !empty($firma_parts) ? '-' . implode(', ', $firma_parts) : '';

                $historias[] = array(
                    'id'      => $post_id,
                    'date'    => get_the_date('c'),
                    'title'   => array('rendered' => get_the_title()),
                    'content' => array('rendered' => get_the_content()),
                    'tipo'    => $tipo,
                    'acf'     => array(
                        'tipo'         => $tipo,
                        'categoria'    => strtoupper($categoria_nombre ?: $categoria_slug),
                        'autor'        => $autor ?: 'Anónimo',
                        'edad'         => $edad ?: '',
                        'ciudad'       => $ciudad ?: '',
                        'firma'        => $firma,
                    ),
                );
            }
            wp_reset_postdata();
        }

        return new WP_REST_Response($historias, 200);
    }
}
