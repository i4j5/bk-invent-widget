import * as $ from 'jquery'

export default function duplicate() {

    let pathname = document.location.pathname.split('/')
    pathname = pathname[1] + pathname[2]
    
    console.log('Start')

    let idSetInterval = setInterval(function() {
        let pathname2 = document.location.pathname.split('/')
        pathname2 = pathname2[1] + pathname2[2]

        if(pathname != pathname2) {
            clearInterval(idSetInterval)
            console.log('Delete')
        }
        

        $('.pipeline_leads__tag[data-id="35811"], .pipeline_leads__tag[data-id="35509"]')
            .addClass('i4j5-duplicate')
        $('.multisuggest__list-item.js-multisuggest-item[data-id="35811"], .multisuggest__list-item.js-multisuggest-item[data-id="35509"]')
            .addClass('i4j5-duplicate-btn')

        $('.i4j5-duplicate-btn').unbind('click')
        $('.i4j5-duplicate-btn').click(() => {
            $('.card-entity-form input.control-phone__formatted, #contacts_list input.control-phone__formatted').each(function(i, elem) {
                let phone = elem.value
                if (phone) {
                    window.open('https://bkinvent.amocrm.ru/contacts/list/?&term='+phone, '_blank')
                }
            })
        })        
    }, 500)
}