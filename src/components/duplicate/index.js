import * as $ from 'jquery'

export default function duplicate() {

    setInterval(function() {
        $('.pipeline_leads__tag[data-id="299589"], .pipeline_leads__tag[data-id="302953"]')
            .addClass('i4j5-duplicate')
        $('.multisuggest__list-item.js-multisuggest-item[data-id="299589"], .multisuggest__list-item.js-multisuggest-item[data-id="302953"]')
            .addClass('i4j5-duplicate-btn')

        $('.i4j5-duplicate-btn').unbind('click')
        $('.i4j5-duplicate-btn').click(() => {
            $('input.control-phone__formatted').each(function(i, elem) {
                var phone = elem.value
                if (phone) {
                    window.open('https://bkinvent.amocrm.ru/contacts/list/?&term='+phone, '_blank')
                }
            })
        })
    }, 100)
}