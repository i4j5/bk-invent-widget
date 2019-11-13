import * as $ from 'jquery'
import * as btnTmpl from './btn.pug'
import * as modalTmpl from './modal.pug'
import Widget from '../../widget'

export default function createLeadProject(id) {

    let widget =  new Widget()

    if ($('#i4j5-create-lead-project').html()) $('#i4j5-create-lead-project').detach()

    $('.card-holder .button-input-more .button-input__context-menu').prepend(btnTmpl())
    
    // let  ajax = true
    //$(document).off('click', '#i4j5-create-lead-project')
    $(document).on('click', '#i4j5-create-lead-project', function(event) {
        new widget.Modal({
            class_name: 'modal-window',
            init: function ($modal_body) {
                $modal_body
                    .trigger('modal:loaded')
                    .html(modalTmpl())
                    .trigger('modal:centrify')
                    .append('');
            },
            destroy: function () {
            }
        })
        // event.stopPropagation()
        // event.preventDefault()
        // if (ajax) {
        //     $('body').addClass('page-loading');
        //     ajax = false
        //     $.post(
        //         `//${widget.settings.server}/api/webhook/amo/create-lead-folders`, 
        //         {
        //             id: id
        //         }
        //     ).done(function() {
        //         $('body').removeClass('page-loading')
        //         //TODO Вызвать окно !!!
        //         ajax = true
        //     })
        // }
    })
    
}