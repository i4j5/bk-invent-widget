import * as $ from 'jquery'

export default function duplicate() {
    $('.pipeline_leads__tag[data-id="299589"]').addClass('i4j5-duplicate')
    $('.multisuggest__list-item.js-multisuggest-item[data-id="299589"]').addClass('i4j5-duplicate-btn').click(function() {
        $('input.control-phone__formatted').each(function(i, elem) {
            let phone = elem.value
            if (phone) {
                window.open('https://bkinvent.amocrm.ru/contacts/list/?&term='+phone, '_blank')
            }
        })
    })
}