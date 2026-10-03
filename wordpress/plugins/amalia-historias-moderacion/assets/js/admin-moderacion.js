/**
 * Script de Moderación Rápida y Acciones AJAX para Historias (Amalia 10 Años)
 */
(function($) {
    'use strict';

    $(document).ready(function() {
        const modalOverlay = $('#amalia-modal-overlay');
        const modalTitle   = $('#amaliaModalTitle');
        const modalAutor   = $('#amaliaModalAutor');
        const modalEdad    = $('#amaliaModalEdad');
        const modalCiudad  = $('#amaliaModalCiudad');
        const modalCat     = $('#amaliaModalCategoria');
        const modalStatus  = $('#amaliaModalStatus');
        const modalContent = $('#amaliaModalContent');
        const modalBtnApprove = $('#amaliaModalBtnApprove');
        const modalBtnTrash   = $('#amaliaModalBtnTrash');

        const ICON_GOMA_SVG = '<svg class="amalia-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path><path d="m5 11 9 9"></path></svg>';

        let currentActivePostId = null;

        // -------------------------------------------------------------
        // 1. ABRIR MODAL CON DETALLE DE LA HISTORIA
        // -------------------------------------------------------------
        $(document).on('click', '.amalia-open-modal', function(e) {
            e.preventDefault();
            const btn = $(this);

            currentActivePostId = btn.data('id');
            const title   = btn.data('title') || 'Historia #' + currentActivePostId;
            const content = btn.data('content') || '';
            const autor   = btn.data('autor') || 'Anónimo';
            const edad    = btn.data('edad') || '—';
            const ciudad  = btn.data('ciudad') || '—';
            const cat     = btn.data('categoria') || 'Sin categoría';
            const status  = btn.data('status') || 'pending';

            modalTitle.text(title);
            modalAutor.text(autor);
            modalEdad.text(edad);
            modalCiudad.text(ciudad);
            modalCat.text(cat);
            modalContent.text(content);

            // Estado visual y botón de acción en modal
            if (status === 'publish') {
                modalStatus.html('<span class="amalia-badge amalia-badge-publish">Aprobada</span>');
                modalBtnApprove
                    .text('Pasar a Borrador')
                    .data('nuevo-estado', 'draft')
                    .removeClass('amalia-modal-btn-approve')
                    .addClass('amalia-modal-btn-draft');
            } else if (status === 'draft') {
                modalStatus.html('<span class="amalia-badge amalia-badge-draft">Borrador</span>');
                modalBtnApprove
                    .text('Aprobar')
                    .data('nuevo-estado', 'publish')
                    .removeClass('amalia-modal-btn-draft')
                    .addClass('amalia-modal-btn-approve');
            } else {
                modalStatus.html('<span class="amalia-badge amalia-badge-pending">Pendiente</span>');
                modalBtnApprove
                    .text('Aprobar')
                    .data('nuevo-estado', 'publish')
                    .removeClass('amalia-modal-btn-draft')
                    .addClass('amalia-modal-btn-approve');
            }

            modalBtnApprove.data('id', currentActivePostId);
            modalBtnTrash.data('id', currentActivePostId);

            modalOverlay.addClass('is-open');
            $('body').css('overflow', 'hidden');
        });

        // -------------------------------------------------------------
        // 2. CERRAR MODAL
        // -------------------------------------------------------------
        function closeModal() {
            modalOverlay.removeClass('is-open');
            $('body').css('overflow', '');
            currentActivePostId = null;
        }

        $(document).on('click', '.amalia-modal-close-btn, [data-modal-action="close"]', function(e) {
            e.preventDefault();
            closeModal();
        });

        $(document).on('click', '#amalia-modal-overlay', function(e) {
            if ($(e.target).is('#amalia-modal-overlay')) {
                closeModal();
            }
        });

        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.hasClass('is-open')) {
                closeModal();
            }
        });

        // -------------------------------------------------------------
        // 3. CAMBIAR ESTADO INDIVIDUAL VÍA AJAX
        // -------------------------------------------------------------
        $(document).on('click', '.amalia-btn-ajax', function(e) {
            e.preventDefault();
            const btn = $(this);
            const postId = btn.data('id');
            const nuevoEstado = btn.data('nuevo-estado');

            if (!postId || !nuevoEstado) return;

            // Confirmación si se va a eliminar a la papelera
            if (nuevoEstado === 'trash') {
                if (!confirm('¿Mover esta historia a la papelera?')) {
                    return;
                }
            }

            btn.addClass('is-loading');

            $.ajax({
                url: amaliaModeracion.ajax_url,
                type: 'POST',
                data: {
                    action: 'amalia_cambiar_estado_historia',
                    post_id: postId,
                    nuevo_estado: nuevoEstado,
                    nonce: amaliaModeracion.nonce
                },
                success: function(response) {
                    btn.removeClass('is-loading');
                    if (response.success) {
                        if (nuevoEstado === 'trash') {
                            // Remover la fila visualmente de inmediato
                            $('#post-' + postId + ', #amalia-dash-row-' + postId).fadeOut(300, function() { 
                                $(this).remove(); 
                            });
                            if (modalOverlay.hasClass('is-open') && currentActivePostId === postId) {
                                closeModal();
                            }
                        } else {
                            // Actualizar fila en la tabla del CPT o Dashboard
                            actualizarFilaUI(postId, response.data.estado, response.data.badge_html, response.data.btn_html);

                            // Si fue desde el modal, actualizar estado interno
                            if (modalOverlay.hasClass('is-open') && currentActivePostId === postId) {
                                modalStatus.html(response.data.badge_html);
                                if (nuevoEstado === 'publish') {
                                    modalBtnApprove
                                        .text('Pasar a Borrador')
                                        .data('nuevo-estado', 'draft')
                                        .removeClass('amalia-modal-btn-approve')
                                        .addClass('amalia-modal-btn-draft');
                                } else {
                                    modalBtnApprove
                                        .text('Aprobar')
                                        .data('nuevo-estado', 'publish')
                                        .removeClass('amalia-modal-btn-draft')
                                        .addClass('amalia-modal-btn-approve');
                                }
                            }
                        }

                        // Actualizar contador del Dashboard si existe
                        actualizarContadorPendientes(response.data.pendientes_count);
                    } else {
                        alert(response.data ? response.data.message : 'Error al procesar la acción.');
                    }
                },
                error: function() {
                    btn.removeClass('is-loading');
                    alert('Error de conexión con el servidor.');
                }
            });
        });

        // Actualizar fila en la interfaz
        function actualizarFilaUI(postId, estado, badgeHtml, btnHtml) {
            // En listado CPT: columna de estado y acciones
            const statusCell = $('.amalia-status-cell[data-id="' + postId + '"]');
            if (statusCell.length) {
                statusCell.html(badgeHtml + '<div class="amalia-action-buttons">' + btnHtml + '</div>');
            }

            // En Dashboard Widget
            const dashRow = $('#amalia-dash-row-' + postId);
            if (dashRow.length) {
                dashRow.find('.amalia-dash-status').html(badgeHtml);
                dashRow.find('.amalia-dash-actions').html(btnHtml);
                if (estado === 'publish') {
                    dashRow.css('opacity', '0.65');
                    dashRow.find('.amalia-dash-cb').prop('checked', false).prop('disabled', true);
                } else {
                    dashRow.css('opacity', '1');
                    dashRow.find('.amalia-dash-cb').prop('disabled', false);
                }
            }

            // Actualizar atributo data-status del botón modal
            $('.amalia-open-modal[data-id="' + postId + '"]').data('status', estado);
        }

        // Actualizar contador de pendientes
        function actualizarContadorPendientes(count) {
            if (typeof count !== 'undefined') {
                const badge = $('.amalia-dash-badge-counter');
                if (badge.length) {
                    if (count > 0) {
                        badge.text(count + ' pendientes de moderar').css({ background: '#fef3d6', color: '#946300', borderColor: '#f6e0a4' }).show();
                    } else {
                        badge.text('0 pendientes').css({ background: '#e7f7ed', color: '#18794e', borderColor: '#c6ebd4' });
                    }
                }
            }
        }

        // -------------------------------------------------------------
        // 4. ACCIONES POR LOTE EN EL DASHBOARD WIDGET
        // -------------------------------------------------------------
        $(document).on('change', '#amalia-dash-select-all', function() {
            const isChecked = $(this).is(':checked');
            $('.amalia-dash-cb:not(:disabled)').prop('checked', isChecked);
        });

        $(document).on('click', '#amalia-dash-bulk-approve-btn', function(e) {
            e.preventDefault();
            const btn = $(this);
            const selectedIds = [];

            $('.amalia-dash-cb:checked').each(function() {
                selectedIds.push($(this).val());
            });

            if (selectedIds.length === 0) {
                alert('Por favor selecciona al menos una historia pendiente.');
                return;
            }

            if (!confirm('¿Deseas aprobar y publicar ' + selectedIds.length + ' historia(s) seleccionada(s)?')) {
                return;
            }

            btn.addClass('is-loading');

            $.ajax({
                url: amaliaModeracion.ajax_url,
                type: 'POST',
                data: {
                    action: 'amalia_aprobar_lote_historias',
                    post_ids: selectedIds,
                    nonce: amaliaModeracion.nonce
                },
                success: function(response) {
                    btn.removeClass('is-loading');
                    if (response.success) {
                        selectedIds.forEach(function(id) {
                            const badge = '<span class="amalia-badge amalia-badge-publish">Aprobada</span>';
                            // Generar botones con el nuevo formato: BORRADOR + OJO + BASURA
                            const postRow = $('#amalia-dash-row-' + id);
                            const modalBtn = postRow.find('.amalia-open-modal');
                            const title = modalBtn.data('title') || '';
                            const content = modalBtn.data('content') || '';
                            const autor = modalBtn.data('autor') || '';
                            const edad = modalBtn.data('edad') || '';
                            const ciudad = modalBtn.data('ciudad') || '';
                            const cat = modalBtn.data('categoria') || '';

                            const btns = '<button type="button" class="amalia-btn amalia-btn-unpublish amalia-btn-ajax" data-id="' + id + '" data-nuevo-estado="draft" title="Pasar a Borrador"><span class="dashicons dashicons-edit"></span></button>'
                                       + '<button type="button" class="amalia-btn amalia-btn-view amalia-open-modal" data-id="' + id + '" data-title="' + title + '" data-content="' + content + '" data-autor="' + autor + '" data-edad="' + edad + '" data-ciudad="' + ciudad + '" data-categoria="' + cat + '" data-status="publish" title="Leer historia"><span class="dashicons dashicons-visibility"></span></button>'
                                       + '<button type="button" class="amalia-btn amalia-btn-trash amalia-btn-ajax" data-id="' + id + '" data-nuevo-estado="trash" title="Eliminar">' + ICON_GOMA_SVG + '</button>';

                            actualizarFilaUI(id, 'publish', badge, btns);
                        });
                        $('#amalia-dash-select-all').prop('checked', false);
                        actualizarContadorPendientes(response.data.pendientes_count);
                    } else {
                        alert(response.data ? response.data.message : 'Error al aprobar historias en lote.');
                    }
                },
                error: function() {
                    btn.removeClass('is-loading');
                    alert('Error de conexión.');
                }
            });
        });
    });
})(jQuery);
