import * as $ from 'jquery'
import Widget from '../../widget'

export default function tags() {

    let widget = new Widget()
    let system = widget.super.system()

    let pathname = document.location.pathname.split('/')
    pathname = pathname[1] + pathname[2]

    let idSetInterval = setInterval(function() {
        let pathname2 = document.location.pathname.split('/')
        pathname2 = pathname2[1] + pathname2[2]

        if(pathname != pathname2) {
            clearInterval(idSetInterval)
        }

        // Дубль
        $('.pipeline_leads__tag[data-id="35811"], .pipeline_leads__tag[data-id="35509"]')
            .addClass('i4j5-duplicate')
        $('.multisuggest__list-item.js-multisuggest-item[data-id="35811"], .multisuggest__list-item.js-multisuggest-item[data-id="35509"]')
            .addClass('i4j5-duplicate-btn')

        $('.i4j5-duplicate-btn').unbind('click')
        $('.i4j5-duplicate-btn').click(() => {
            $('.card-entity-form input.control-phone__formatted, #contacts_list input.control-phone__formatted').each(function(i, elem) {
                let phone = elem.value.replace(/[^\d]/g, '')
                if (phone) {
                    window.open(`//${system.domain}/contacts/list/?&term=${phone}`, '_blank')
                }
            })
        })  

        // Заявка и звлнок с сайта
        // 26767, 52605
        $('.pipeline_leads__tag[data-id="26767"], .pipeline_leads__tag[data-id="52605"]')
            .addClass('i4j5-tag__site')
        // $('.multisuggest__list-item.js-multisuggest-item[data-id="26767"], .multisuggest__list-item.js-multisuggest-item[data-id="52605"]')
        //     .addClass('i4j5-tag__site')

        // Авито-магазин 76379
        $('.pipeline_leads__tag[data-id="76379"]').addClass('i4j5-tag__avito-shop')

    }, 500)
}