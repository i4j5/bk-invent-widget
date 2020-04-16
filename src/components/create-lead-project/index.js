import * as $ from 'jquery'
import * as btnTmpl from './btn.pug'
import * as modalTmpl from './modal.pug'
import * as modalOkTmpl from './modal-ok.pug'
import Widget from '../../widget'

export default function createLeadProject(lead_id) {

    let widget =  new Widget()

    if ($('#i4j5-create-lead-project').html()) $('#i4j5-create-lead-project').detach()

    $('.card-holder .card-fields__top-name-more .button-input-more .button-input__context-menu').prepend(btnTmpl())
    
    let openModal = true
    $(document).off('click', '#i4j5-create-lead-project')
    $(document).on('click', '#i4j5-create-lead-project', function(event) {
        openModal = false
        //$(document).off('submit', '#i4j5-create-lead-project__form')

        let modal = new widget.Modal({
            class_name: 'modal-window',
            init: function ($modal_body) {
                $modal_body
                    .trigger('modal:loaded')
                    .html(modalTmpl({lead_id}))
                    .trigger('modal:centrify')
                    .append('');
            },
            destroy: function () {
                openModal = true
                $(document).off('submit', '#i4j5-create-lead-project__form')
            }
        })

        let ajax = true
        $(document).on('submit','#i4j5-create-lead-project__form', function (event) {
            event.preventDefault()
            event.stopPropagation()

            if (ajax) {
                ajax = false

                let data = {
                    'deal': lead_id,
                    'project': '',
                    'task': '',
                    'section': '',
                }

                data  = {...data, ...eval( '(' + $('#i4j5-create-lead-project__template_id').val() + ')')}

                //console.log(data, eval( '(' + $('#i4j5-create-lead-project__template_id').val() + ')'))

                modal.destroy()
                $('body').addClass('page-loading')

                $.ajax({
                    url: `//${widget.settings.server}/api/webhook/amocrm/create-deal-project`,
                    type: 'post',
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    data: data
                }).done(function(res) {

                    console.log(res);

                    setTimeout(function() {
                        $.ajax({
                            url: `//${widget.settings.server}/api/webhook/amocrm/update-deal-project`,
                            type: 'post',
                            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                            data: res
                        })
    
                        $('body').removeClass('page-loading')
    
                        let modal_ok = new widget.Modal({
                            class_name: 'modal-window',
                            init: function ($modal_body) {
                                $modal_body
                                    .trigger('modal:loaded')
                                    .html(modalOkTmpl())
                                    .trigger('modal:centrify')
                                    .append('');
                            },
                            destroy: function () {
                                openModal = true
                                $(document).off('submit', '#i4j5-create-lead-project__form')
                            }
                        })
    
                        ajax = true
                    }, 40000)

                })
                .always(function() {
                    //console.log($('#i4j5-create-lead-project__form').serialize())
                })
            }
        });
    })
    
}