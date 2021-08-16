import * as $ from 'jquery'
import * as tmpl from './tmpl.pug'
import Widget from '../../widget'
import * as modalOkTmpl from './modal-ok.pug'

export default function createLeadFolders(id) {

    let widget =  new Widget()

    if ($('#i4j5-create-lead-folders').html()) $('#i4j5-create-lead-folders').detach()

    $('.card-holder .card-fields__top-name-more .button-input-more .button-input__context-menu').prepend(tmpl())
    
    let  ajax = true
    $(document).off('click', '#i4j5-create-lead-folders')
    $(document).on('click', '#i4j5-create-lead-folders', function(event) {
        event.stopPropagation()
        event.preventDefault()
        if (ajax) {
            $('body').addClass('page-loading');
            ajax = false
            $.post(
                // `//${widget.settings.server}/api/webhook/amocrm/create-deal-folders`, 
                'https://bkinvent.na4u.ru/api/google-drive/create-project-folder',
                {
                    id: id
                }
            ).done(function() {
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
                    }
                })

                ajax = true
            })
        }
    })
    
}