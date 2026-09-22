-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 22-09-2026 a las 22:33:05
-- Versión del servidor: 10.11.13-MariaDB-0ubuntu0.24.04.1
-- Versión de PHP: 8.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stagings-cmsamalia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wp_posts`
--

CREATE TABLE `wp_posts` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `post_author` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(255) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Volcado de datos para la tabla `wp_posts`
--

INSERT INTO `wp_posts` (`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES
(4, 0, '2026-09-22 19:06:07', '2026-09-22 19:06:07', '<!-- wp:page-list /-->', 'Navigation', '', 'publish', 'closed', 'closed', '', 'navigation', '', '', '2026-09-22 19:06:07', '2026-09-22 19:06:07', '', 0, 'https://cmsamalia.stagings.website/?p=4', 0, 'wp_navigation', '', 0),
(5, 1, '2026-09-22 19:09:19', '0000-00-00 00:00:00', '', 'Auto Draft', '', 'auto-draft', 'open', 'open', '', '', '', '', '2026-09-22 19:09:19', '0000-00-00 00:00:00', '', 0, 'https://cmsamalia.stagings.website/?p=5', 0, 'post', '', 0),
(6, 1, '2026-09-22 19:37:20', '2026-09-22 19:37:20', 'a:37:{s:9:\"post_type\";s:15:\"amalia_historia\";s:22:\"advanced_configuration\";b:0;s:13:\"import_source\";s:0:\"\";s:11:\"import_date\";s:0:\"\";s:15:\"allow_ai_access\";b:0;s:14:\"ai_description\";s:0:\"\";s:6:\"labels\";a:33:{s:4:\"name\";s:9:\"Historias\";s:13:\"singular_name\";s:8:\"Historia\";s:9:\"menu_name\";s:13:\"CPT Historias\";s:9:\"all_items\";s:17:\"All CPT Historias\";s:9:\"edit_item\";s:13:\"Edit Historia\";s:9:\"view_item\";s:13:\"View Historia\";s:10:\"view_items\";s:18:\"View CPT Historias\";s:12:\"add_new_item\";s:16:\"Add New Historia\";s:7:\"add_new\";s:16:\"Add New Historia\";s:8:\"new_item\";s:12:\"New Historia\";s:17:\"parent_item_colon\";s:16:\"Parent Historia:\";s:12:\"search_items\";s:20:\"Search CPT Historias\";s:9:\"not_found\";s:22:\"No cpt historias found\";s:18:\"not_found_in_trash\";s:31:\"No cpt historias found in Trash\";s:8:\"archives\";s:17:\"Historia Archives\";s:10:\"attributes\";s:19:\"Historia Attributes\";s:14:\"featured_image\";s:0:\"\";s:18:\"set_featured_image\";s:0:\"\";s:21:\"remove_featured_image\";s:0:\"\";s:18:\"use_featured_image\";s:0:\"\";s:16:\"insert_into_item\";s:20:\"Insert into historia\";s:21:\"uploaded_to_this_item\";s:25:\"Uploaded to this historia\";s:17:\"filter_items_list\";s:25:\"Filter cpt historias list\";s:14:\"filter_by_date\";s:28:\"Filter cpt historias by date\";s:21:\"items_list_navigation\";s:29:\"CPT Historias list navigation\";s:10:\"items_list\";s:18:\"CPT Historias list\";s:14:\"item_published\";s:19:\"Historia published.\";s:24:\"item_published_privately\";s:29:\"Historia published privately.\";s:22:\"item_reverted_to_draft\";s:27:\"Historia reverted to draft.\";s:14:\"item_scheduled\";s:19:\"Historia scheduled.\";s:12:\"item_updated\";s:17:\"Historia updated.\";s:9:\"item_link\";s:13:\"Historia Link\";s:21:\"item_link_description\";s:21:\"A link to a historia.\";}s:11:\"description\";s:0:\"\";s:6:\"public\";b:1;s:12:\"hierarchical\";b:1;s:19:\"exclude_from_search\";b:0;s:18:\"publicly_queryable\";b:1;s:7:\"show_ui\";b:1;s:12:\"show_in_menu\";b:1;s:17:\"admin_menu_parent\";s:0:\"\";s:17:\"show_in_admin_bar\";b:1;s:17:\"show_in_nav_menus\";b:1;s:12:\"show_in_rest\";b:1;s:9:\"rest_base\";s:0:\"\";s:14:\"rest_namespace\";s:5:\"wp/v2\";s:21:\"rest_controller_class\";s:24:\"WP_REST_Posts_Controller\";s:13:\"menu_position\";s:0:\"\";s:9:\"menu_icon\";a:2:{s:4:\"type\";s:9:\"dashicons\";s:5:\"value\";s:20:\"dashicons-admin-post\";}s:19:\"rename_capabilities\";b:0;s:24:\"singular_capability_name\";s:4:\"post\";s:22:\"plural_capability_name\";s:5:\"posts\";s:8:\"supports\";a:4:{i:0;s:5:\"title\";i:1;s:6:\"editor\";i:2;s:9:\"thumbnail\";i:3;s:13:\"custom-fields\";}s:10:\"taxonomies\";a:1:{i:0;s:18:\"categoria_historia\";}s:11:\"has_archive\";b:0;s:16:\"has_archive_slug\";s:0:\"\";s:7:\"rewrite\";a:4:{s:17:\"permalink_rewrite\";s:13:\"post_type_key\";s:10:\"with_front\";s:1:\"1\";s:5:\"feeds\";s:1:\"0\";s:5:\"pages\";s:1:\"1\";}s:9:\"query_var\";s:13:\"post_type_key\";s:14:\"query_var_name\";s:0:\"\";s:10:\"can_export\";b:1;s:16:\"delete_with_user\";b:0;s:20:\"register_meta_box_cb\";s:0:\"\";s:16:\"enter_title_here\";s:0:\"\";}', 'Historias', 'historias', 'publish', 'closed', 'closed', '', 'post_type_6ab2d8c2a826e', '', '', '2026-09-22 20:06:30', '2026-09-22 20:06:30', '', 0, 'https://cmsamalia.stagings.website/?post_type=acf-post-type&#038;p=6', 0, 'acf-post-type', '', 0),
(7, 1, '2026-09-22 19:39:24', '2026-09-22 19:39:24', 'a:11:{s:8:\"location\";a:1:{i:0;a:1:{i:0;a:3:{s:5:\"param\";s:9:\"post_type\";s:8:\"operator\";s:2:\"==\";s:5:\"value\";s:15:\"amalia_historia\";}}}s:8:\"position\";s:6:\"normal\";s:5:\"style\";s:7:\"default\";s:15:\"label_placement\";s:3:\"top\";s:21:\"instruction_placement\";s:5:\"label\";s:14:\"hide_on_screen\";s:0:\"\";s:11:\"description\";s:0:\"\";s:12:\"show_in_rest\";i:0;s:13:\"display_title\";s:0:\"\";s:15:\"allow_ai_access\";b:0;s:14:\"ai_description\";s:0:\"\";}', 'CF Historias', 'cf-historias', 'publish', 'closed', 'closed', '', 'group_6ab2d8fc45255', '', '', '2026-09-22 20:26:12', '2026-09-22 20:26:12', '', 0, 'https://cmsamalia.stagings.website/?post_type=acf-field-group&#038;p=7', 0, 'acf-field-group', '', 0),
(10, 1, '2026-09-22 19:40:26', '2026-09-22 19:40:26', 'a:31:{s:8:\"taxonomy\";s:18:\"categoria_historia\";s:11:\"object_type\";s:0:\"\";s:22:\"advanced_configuration\";i:0;s:13:\"import_source\";s:0:\"\";s:11:\"import_date\";s:0:\"\";s:6:\"labels\";a:25:{s:4:\"name\";s:13:\"Cat Historias\";s:13:\"singular_name\";s:12:\"Cat Historia\";s:9:\"menu_name\";s:13:\"Cat Historias\";s:9:\"all_items\";s:17:\"All Cat Historias\";s:9:\"edit_item\";s:17:\"Edit Cat Historia\";s:9:\"view_item\";s:17:\"View Cat Historia\";s:11:\"update_item\";s:19:\"Update Cat Historia\";s:12:\"add_new_item\";s:20:\"Add New Cat Historia\";s:13:\"new_item_name\";s:21:\"New Cat Historia Name\";s:11:\"parent_item\";s:19:\"Parent Cat Historia\";s:17:\"parent_item_colon\";s:20:\"Parent Cat Historia:\";s:12:\"search_items\";s:20:\"Search Cat Historias\";s:9:\"most_used\";s:0:\"\";s:9:\"not_found\";s:22:\"No cat historias found\";s:8:\"no_terms\";s:16:\"No cat historias\";s:22:\"name_field_description\";s:0:\"\";s:22:\"slug_field_description\";s:0:\"\";s:24:\"parent_field_description\";s:0:\"\";s:22:\"desc_field_description\";s:0:\"\";s:14:\"filter_by_item\";s:22:\"Filter by cat historia\";s:21:\"items_list_navigation\";s:29:\"Cat Historias list navigation\";s:10:\"items_list\";s:18:\"Cat Historias list\";s:13:\"back_to_items\";s:23:\"← Go to cat historias\";s:9:\"item_link\";s:17:\"Cat Historia Link\";s:21:\"item_link_description\";s:24:\"A link to a cat historia\";}s:11:\"description\";s:0:\"\";s:12:\"capabilities\";a:4:{s:12:\"manage_terms\";s:17:\"manage_categories\";s:10:\"edit_terms\";s:17:\"manage_categories\";s:12:\"delete_terms\";s:17:\"manage_categories\";s:12:\"assign_terms\";s:10:\"edit_posts\";}s:6:\"public\";i:1;s:18:\"publicly_queryable\";i:1;s:12:\"hierarchical\";i:1;s:7:\"show_ui\";i:1;s:12:\"show_in_menu\";i:1;s:17:\"show_in_nav_menus\";i:1;s:12:\"show_in_rest\";i:1;s:9:\"rest_base\";s:0:\"\";s:14:\"rest_namespace\";s:5:\"wp/v2\";s:21:\"rest_controller_class\";s:24:\"WP_REST_Terms_Controller\";s:13:\"show_tagcloud\";i:1;s:18:\"show_in_quick_edit\";i:1;s:17:\"show_admin_column\";i:0;s:7:\"rewrite\";a:3:{s:17:\"permalink_rewrite\";s:12:\"taxonomy_key\";s:10:\"with_front\";s:1:\"1\";s:20:\"rewrite_hierarchical\";s:1:\"0\";}s:9:\"query_var\";s:13:\"post_type_key\";s:14:\"query_var_name\";s:0:\"\";s:12:\"default_term\";a:1:{s:20:\"default_term_enabled\";s:1:\"0\";}s:4:\"sort\";i:0;s:8:\"meta_box\";s:7:\"default\";s:11:\"meta_box_cb\";s:0:\"\";s:20:\"meta_box_sanitize_cb\";s:0:\"\";s:15:\"allow_ai_access\";b:0;s:14:\"ai_description\";s:0:\"\";}', 'Cat Historias', 'cat-historias', 'publish', 'closed', 'closed', '', 'taxonomy_6ab2d984e0c8d', '', '', '2026-09-22 19:40:26', '2026-09-22 19:40:26', '', 0, 'https://cmsamalia.stagings.website/?post_type=acf-taxonomy&#038;p=10', 0, 'acf-taxonomy', '', 0),
(11, 1, '2026-09-22 20:01:52', '2026-09-22 20:01:52', 'a:12:{s:10:\"aria-label\";s:0:\"\";s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";s:17:\"allow_in_bindings\";i:0;s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";}', 'Nombre', 'autor_nombre', 'publish', 'closed', 'closed', '', 'field_6ab2de8a93565', '', '', '2026-09-22 20:01:52', '2026-09-22 20:01:52', '', 7, 'https://cmsamalia.stagings.website/?post_type=acf-field&p=11', 0, 'acf-field', '', 0),
(12, 1, '2026-09-22 20:01:52', '2026-09-22 20:01:52', 'a:14:{s:10:\"aria-label\";s:0:\"\";s:4:\"type\";s:6:\"number\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:3:\"min\";s:0:\"\";s:3:\"max\";s:0:\"\";s:17:\"allow_in_bindings\";i:0;s:11:\"placeholder\";s:0:\"\";s:4:\"step\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";}', 'Edad', 'autor_edad', 'publish', 'closed', 'closed', '', 'field_6ab2de9393566', '', '', '2026-09-22 20:01:52', '2026-09-22 20:01:52', '', 7, 'https://cmsamalia.stagings.website/?post_type=acf-field&p=12', 1, 'acf-field', '', 0),
(13, 1, '2026-09-22 20:01:52', '2026-09-22 20:01:52', 'a:12:{s:10:\"aria-label\";s:0:\"\";s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";s:17:\"allow_in_bindings\";i:0;s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";}', 'Ciudad', 'autor_ciudad', 'publish', 'closed', 'closed', '', 'field_6ab2dea293567', '', '', '2026-09-22 20:01:52', '2026-09-22 20:01:52', '', 7, 'https://cmsamalia.stagings.website/?post_type=acf-field&p=13', 2, 'acf-field', '', 0),
(14, 1, '2026-09-22 20:07:57', '0000-00-00 00:00:00', '', 'Auto Draft', '', 'auto-draft', 'closed', 'closed', '', '', '', '', '2026-09-22 20:07:57', '0000-00-00 00:00:00', '', 0, 'https://cmsamalia.stagings.website/?post_type=amalia_historia&p=14', 0, 'amalia_historia', '', 0),
(15, 1, '2026-09-22 20:07:57', '2026-09-22 20:07:57', '{\"version\": 3, \"isGlobalStylesUserThemeJSON\": true }', 'Custom Styles', '', 'publish', 'closed', 'closed', '', 'wp-global-styles-twentytwentyfive', '', '', '2026-09-22 20:07:57', '2026-09-22 20:07:57', '', 0, 'https://cmsamalia.stagings.website/?p=15', 0, 'wp_global_styles', '', 0),
(16, 0, '2026-09-22 20:15:56', '0000-00-00 00:00:00', 'Test de conexion automatica', 'Test de conexion automatica', '', 'pending', 'closed', 'closed', '', '', '', '', '2026-09-22 20:15:56', '0000-00-00 00:00:00', '', 0, 'https://cmsamalia.stagings.website/?p=16', 0, 'historia', '', 0),
(17, 1, '2026-09-22 20:18:20', '0000-00-00 00:00:00', '', 'Auto Draft', '', 'auto-draft', 'closed', 'closed', '', '', '', '', '2026-09-22 20:18:20', '0000-00-00 00:00:00', '', 0, 'https://cmsamalia.stagings.website/?post_type=amalia_historia&p=17', 0, 'amalia_historia', '', 0),
(18, 1, '2026-09-22 20:18:36', '0000-00-00 00:00:00', '', 'Auto Draft', '', 'auto-draft', 'closed', 'closed', '', '', '', '', '2026-09-22 20:18:36', '0000-00-00 00:00:00', '', 0, 'https://cmsamalia.stagings.website/?post_type=amalia_historia&p=18', 0, 'amalia_historia', '', 0),
(19, 0, '2026-09-22 20:24:00', '0000-00-00 00:00:00', 'Esta es una historia de prueba enviada desde el nuevo snippet para validar que entra al panel de WordPress amalia_historia.', 'Esta es una historia de prueba...', '', 'pending', 'closed', 'closed', '', '', '', '', '2026-09-22 20:24:00', '0000-00-00 00:00:00', '', 0, 'https://cmsamalia.stagings.website/?p=19', 0, 'historia', '', 0),
(20, 1, '2026-09-22 20:25:09', '2026-09-22 20:25:09', '', 'Esta yo la cree manualmente', '', 'publish', 'closed', 'closed', '', 'nada', '', '', '2026-09-22 20:30:24', '2026-09-22 20:30:24', '', 0, 'https://cmsamalia.stagings.website/?post_type=amalia_historia&#038;p=20', 0, 'amalia_historia', '', 0),
(21, 0, '2026-09-22 20:27:13', '0000-00-00 00:00:00', 'Tercera historia de prueba: probando guardado en amalia_historia tras asociar CF en WordPress.', 'Tercera historia de prueba: probando guardado...', '', 'pending', 'closed', 'closed', '', '', '', '', '2026-09-22 20:27:13', '0000-00-00 00:00:00', '', 0, 'https://cmsamalia.stagings.website/?p=21', 0, 'historia', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `wp_posts`
--
ALTER TABLE `wp_posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `post_name` (`post_name`(191)),
  ADD KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  ADD KEY `post_parent` (`post_parent`),
  ADD KEY `post_author` (`post_author`),
  ADD KEY `type_status_author` (`post_type`,`post_status`,`post_author`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `wp_posts`
--
ALTER TABLE `wp_posts`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
