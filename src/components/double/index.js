import * as $ from 'jquery'
import * as btnTmpl from './btn.pug'
// import * as modalOkTmpl from './modal-ok.pug'
import Widget from '../../widget'
import search from '../search'

export default function double(lead_id) {

    $('.control-phone input.control-phone__formatted ').each(function( index ) {
        let $this = $(this)
        let phone = $this.val().replace(/[^\d]/g, '')

        $this.parent().parent().children('.tips').children('.tips__inner').append(btnTmpl({phone: $this.val()}))

        search()

        if(phone) {
            checkContact(phone, $this)
        }
    })
}

function checkContact(phone, $el) {
    $.ajax({
        url: `//bkinvent.amocrm.ru/api/v2/contacts?query=${phone}`,
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    }).done(function(res) {
        console.log(res._embedded.items)
        if (res._embedded.items.length >= 2) {
            //let $parent = $el.parent()
            $el.addClass('i4j5-double')
       }
    })
}
