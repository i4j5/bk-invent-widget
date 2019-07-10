import * as $ from 'jquery'
import duplicate from '../components/duplicate'
import costPrice from '../components/cost-price'
import createLeadFolders from '../components/create-lead-folders'
import Mail from '../components/mail'

export default {
    constriclor() {
        $('.pipeline_leads__tag[data-id="299589"]').addClass('i4j5-duplicate')
        
        $('.multisuggest__list-item.js-multisuggest-item[data-id="299589"]').addClass('i4j5-duplicate-btn').click(function() {
            $('input.control-phone__formatted').each(function(i, elem) {
                var phone = elem.value
                if (phone) {
                    window.open('https://bkinvent.amocrm.ru/contacts/list/?&term='+phone, '_blank')
                }
            })
        })
    },

    pipeline() {
        this.constriclor()      
    },

    detail(id) {
        this.constriclor()

        // Подключаем кнопку "Создать клиентскую папку"
        createLeadFolders(id)

        // Cебестоимость
        costPrice()
        
        // ДУБЛИ!
        duplicate()

        // Почта
        window.Mail = Mail

    }
}