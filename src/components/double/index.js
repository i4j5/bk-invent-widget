import * as $ from 'jquery'
import * as btnTmpl from './btn.pug'
// import * as modalOkTmpl from './modal-ok.pug'
import Widget from '../../widget'
import search from '../search'
import './style.sass'

let data = {
    system: {}
}

export default function double(lead_id) {

    let widget = new Widget()
    data.system = widget.super.system()

    $('.control-phone input.control-phone__formatted').each(function( index ) {
        let $this = $(this)
        let phone = $this.val().replace(/[^\d]/g, '')

        $this.parent().parent().children('.js-tip-holder').children('.tips').children('.tips__inner').append(btnTmpl({phone}))

        search()

        if(phone) {
            checkContact(phone, $this)
        }
    })
}

function checkContact(phone, $el) {
    $.ajax({
        url: `//${data.system.domain}/api/v2/contacts?query=${phone}`,
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    }).done(function(res) {
        if (res._embedded.items.length >= 2) {
            $el.addClass('i4j5-double')
       }
    })
}
