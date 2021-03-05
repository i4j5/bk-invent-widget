import * as $ from 'jquery'
import * as btnTmpl from './btn.pug'
import * as modalTmpl from './modal.pug'
import * as modalOkTmpl from './modal-ok.pug'
import Widget from '../../widget'

export default function createGoogleCalendarEvent(lead_id) {

    let widget =  new Widget()

    let location = $('[name="CFV[75401]"]').val()
    let summary = $('[name="lead[NAME]"]').val()
    let date = $('[name="CFV[484217]"]').val()
    let start = date + ' ' + $('[name="CFV[484219]"]').val()
    let end = date + ' ' +  $('[name="CFV[484221]"]').val()
    let name = $('[name="contact[FN]"]').val() + ' ' +$('[name="contact[LN]"]').val()
    let phone = $('.control-phone').children('input').val()


    let description = `
ФИО: ${name}
Номер для связи: ${phone}
Промо код: ${lead_id}
    `


    if ($('#i4j5-create-google-calendar-event').html()) $('#i4j5-create-google-calendar-event').detach()

    $('.card-holder .card-fields__top-name-more .button-input-more .button-input__context-menu').prepend(btnTmpl())
    
    let openModal = true
    $(document).off('click', '#i4j5-create-google-calendar-event')
    $(document).on('click', '#i4j5-create-google-calendar-event', function(event) {
        openModal = false

        let modal = new widget.Modal({
            class_name: 'modal-window',
            init: function ($modal_body) {
                $modal_body
                    .trigger('modal:loaded')
                    .html(modalTmpl({
                        lead_id,
                        location,
                        summary,
                        start,
                        end,
                        description,
                    }))
                    .trigger('modal:centrify')
                    .append('');
            },
            destroy: function () {
                openModal = true
                $(document).off('submit', '#i4j5-create-google-calendar-event__form')
            }
        })

        let ajax = true
        $(document).on('submit','#i4j5-create-google-calendar-event__form', function (event) {
            event.preventDefault()
            event.stopPropagation()

            // let $this = $(this)
            // window.thiss = $this

            if (ajax) {

                let data = {
                    'location': $('#i4j5-create-google-calendar-event__location').val(),
                    'summary': $('#i4j5-create-google-calendar-event__summary').val(),
                    'start': $('#i4j5-create-google-calendar-event__start').val(),
                    'end': $('#i4j5-create-google-calendar-event__end').val(),
                    'description': $('#i4j5-create-google-calendar-event__description').val(),
                    'email': $('#i4j5-create-google-calendar-event__email').val(),
                }

                modal.destroy()
                $('body').addClass('page-loading');

                ajax = false

                $.post('https://bkinvent.space/api/add-google-calendar-event', data).done(function(res) {
                    $('body').removeClass('page-loading')

                    console.log(res)
                    
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
                        }
                    })
    
                    ajax = true
                })
            }


            // if (ajax) {
            //     ajax = false

            //     let data = {
            //         location,
            //         summary,
            //         start,
            //         end,
            //         description,
            //     }

            //     data  = {...data, ...eval( '(' + $('#i4j5-create-lead-project__template_id').val() + ')')}


            //     modal.destroy()
            //     $('body').addClass('page-loading')

            //     $.ajax({
            //         url: `//${widget.settings.server}/api/webhook/amocrm/create-deal-project`,
            //         type: 'post',
            //         contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            //         data: data
            //     }).done(function(res) {

            //         let updateTime = 1000

            //         if (res.type == 'task') updateTime = 100

            //         //$('body').removeClass('page-loading')
            //         let modal_synchronization = new widget.Modal({
            //             class_name: 'modal-window',
            //             init_animation: true,
            //             init: function ($modal_body) {

            //                 $modal_body.on('modal:centrify', function() {

            //                     let $this = $(this)

            //                     $this.parent().css('pointer-events', 'none')
            //                     $this.css('pointer-events', 'all')

            //                     let $filler = $('#i4j5-create-lead-project__synchronization-filler')
            //                     let $text = $('#i4j5-create-lead-project__synchronization-text')
            //                     let $bar = $('#i4j5-create-lead-project__synchronization-bar')
            //                     let $btnOK = $('#i4j5-create-lead-project__btn-ok') 

            //                     $btnOK.on('click', function() {
            //                         $('body').removeClass('page-loading')
    
            //                         let modal_ok = new widget.Modal({
            //                             class_name: 'modal-window',
            //                             init: function ($modal_body) {
            //                                 $modal_body
            //                                     .trigger('modal:loaded')
            //                                     .html(modalOkTmpl())
            //                                     .trigger('modal:centrify')
            //                                     .append('')
            //                             },
            //                             destroy: function () {
            //                                 openModal = true
            //                                 $(document).off('submit', '#i4j5-create-lead-project__form')
            //                             }
            //                         })

            //                         setTimeout(function() {
            //                             modal_ok.destroy()
            //                         }, 700)
            //                     })

            //                     let i = 0
            //                     let timerId = setInterval(function(){
            //                         ++i

            //                         if (i <= 100) {
            //                             $filler.css('width', i+'%')
            //                             $bar.css('width', i+'%')
            //                             $text.html(i+'%')
            //                         } else{
            //                             clearInterval(timerId)

            //                             $.ajax({
            //                                 url: `//${widget.settings.server}/api/webhook/amocrm/update-deal-project`,
            //                                 type: 'post',
            //                                 contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            //                                 data: res
            //                             })

            //                             $('#i4j5-create-lead-project__messages').html('Копирование проекта успешно завершено')

            //                             $btnOK.css('display', 'block')
            //                         }

            //                     }, updateTime);
            //                 })

            //                 $modal_body
            //                     .trigger('modal:loaded')
            //                     .html(modalSynchronizationTmpl())
            //                     .trigger('modal:centrify')
            //                     .append('')
            //             },
            //             destroy: function () {
            //                 openModal = true
            //                 $(document).off('submit', '#i4j5-create-lead-project__form')
            //             }
            //         })

            //     })
            //     .always(function() {
            //         //console.log($('#i4j5-create-lead-project__form').serialize())
            //     })
            // }
        });
    })
    
}