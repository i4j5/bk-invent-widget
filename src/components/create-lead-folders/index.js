import * as $ from 'jquery'
import * as tmpl from './tmpl.pug'

export default function createLeadFolders(id) {

    if ($('#i4j5-create-lead-folders').html()) $('#i4j5-create-lead-folders').detach()

    $('.card-holder .button-input-more .button-input__context-menu').prepend(tmpl())
    
    let  ajax = true
    $(document).off('click', '#i4j5-create-lead-folders')
    $(document).on('click', '#i4j5-create-lead-folders', function(event) {
        event.stopPropagation()
        event.preventDefault()
        if (ajax) {
            $('body').addClass('page-loading');
            ajax = false
            $.post(
                '//private.bk-invent.ru/api/webhook/amo/create-lead-folders', 
                {
                    id: id
                }
            ).done(function() {
                $('body').removeClass('page-loading')
                //TODO Вызвать окно !!!
                ajax = true
            })
        }
    })
    
}