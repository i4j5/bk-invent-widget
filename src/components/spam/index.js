import * as $ from 'jquery'
import * as btnTmpl from './btn.pug'
import * as modalOkTmpl from './modal-ok.pug'
import Widget from '../../widget'

let data = {
    contacts: [],
    id: 0,
    system: {}
}

export default function spam(lead_id) {

    data.id = lead_id

    let widget = new Widget()
    data.system = widget.super.system()

    if ($('#i4j5-spam').html()) $('#i4j5-spam').detach()

    $('.card-holder .card-fields__top-name-more .button-input-more .button-input__context-menu').prepend(btnTmpl())

    $(document).off('click', '#i4j5-spam')
    $(document).on('click', '#i4j5-spam', function(event) {
        $('body').addClass('page-loading')
        getContacts(lead_id)
    })
    
}

function getContacts(lead_id) {

    $.ajax({
        url: `//${data.system.domain}/api/v2/leads?id=${lead_id}`,
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    }).done(function(res) {
        data.contacts = res._embedded.items[0].contacts.id
        closeLead()
    })
}

function addTag() {

    if (data.contacts) {
        data.contacts.forEach(function(contact_id) {
            $.ajax({
                url: `//${data.system.domain}/api/v2/contacts`,
                type: 'post',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                data: {
                    update: [{
                        name: 'СПАМ',
                        id: contact_id,
                        tags: 'Спам',
                        updated_at: new Date().getTime(),
                    }]
                }
            })
        })
    }
}

function closeLead() {
    $.ajax({
        url: `//${data.system.domain}/api/v2/leads`,
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: {
            update: [{
                id: data.id,
                status_id: 143,
                pipeline_id: 2291194,
                updated_at: new Date().getTime()
            }]
        }
    }).done(function() {
        $.ajax({
            url: `//${data.system.domain}/api/v2/leads`,
            type: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            data: {
                update: [{
                    id: data.id,
                    updated_at: new Date().getTime(),
                    loss_reason_id: 4104691
                }]
            }
        }).done(function() {

            addTag()

            let widget =  new Widget()

            $('body').removeClass('page-loading')

            let modal_ok = new widget.Modal({
                class_name: 'modal-window',
                init: function ($modal_body) {
                    $modal_body
                        .trigger('modal:loaded')
                        .html(modalOkTmpl())
                        .trigger('modal:centrify')
                        .append('');
                }
            })

        })
    })
}