import * as $ from 'jquery'
import * as btnTmpl from './btn.pug'
import * as modalTmpl from './modal.pug'
import * as modalOkTmpl from './modal-ok.pug'
import * as modalSynchronizationTmpl from './modal-synchronization.pug'
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

                modal.destroy()
                $('body').addClass('page-loading')

                $.ajax({
                    // url: `//${widget.settings.server}/api/webhook/amocrm/create-deal-project`,
                    url: 'https://bkinvent.na4u.ru/api/asana/create-project',
                    type: 'post',
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    data: data
                }).done(function(res) {

                    let updateTime = 500

                    if (res.type == 'task') updateTime = 100

                    //$('body').removeClass('page-loading')
                    let modal_synchronization = new widget.Modal({
                        class_name: 'modal-window',
                        init_animation: true,
                        init: function ($modal_body) {

                            $modal_body.on('modal:centrify', function() {

                                let $this = $(this)

                                $this.parent().css('pointer-events', 'none')
                                $this.css('pointer-events', 'all')

                                let $filler = $('#i4j5-create-lead-project__synchronization-filler')
                                let $text = $('#i4j5-create-lead-project__synchronization-text')
                                let $bar = $('#i4j5-create-lead-project__synchronization-bar')
                                let $btnOK = $('#i4j5-create-lead-project__btn-ok') 

                                $btnOK.on('click', function() {
                                    $('body').removeClass('page-loading')
    
                                    let modal_ok = new widget.Modal({
                                        class_name: 'modal-window',
                                        init: function ($modal_body) {
                                            $modal_body
                                                .trigger('modal:loaded')
                                                .html(modalOkTmpl())
                                                .trigger('modal:centrify')
                                                .append('')
                                        },
                                        destroy: function () {
                                            openModal = true
                                            $(document).off('submit', '#i4j5-create-lead-project__form')
                                        }
                                    })

                                    setTimeout(function() {
                                        modal_ok.destroy()
                                    }, 700)
                                })

                                let i = 0
                                let timerId = setInterval(function(){
                                    ++i

                                    if (i <= 100) {
                                        $filler.css('width', i+'%')
                                        $bar.css('width', i+'%')
                                        $text.html(i+'%')
                                    } else{
                                        clearInterval(timerId)

                                        $.ajax({
                                            // url: `//${widget.settings.server}/api/webhook/amocrm/update-deal-project`,
                                            url: 'https://bkinvent.na4u.ru/api/asana/update-project',
                                            type: 'post',
                                            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                            data: res
                                        })

                                        $('#i4j5-create-lead-project__messages').html('Копирование проекта успешно завершено')

                                        $btnOK.css('display', 'block')
                                    }

                                }, updateTime);
                            })

                            $modal_body
                                .trigger('modal:loaded')
                                .html(modalSynchronizationTmpl())
                                .trigger('modal:centrify')
                                .append('')
                        },
                        destroy: function () {
                            openModal = true
                            $(document).off('submit', '#i4j5-create-lead-project__form')
                        }
                    })

                })
                .always(function() {
                    //console.log($('#i4j5-create-lead-project__form').serialize())
                })
            }
        });
    })
    
}