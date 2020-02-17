import duplicate from '../components/duplicate'
import costPrice from '../components/cost-price'
import createLeadFolders from '../components/create-lead-folders'
import createLeadProject from '../components/create-lead-project'
import widgetsHide from '../components/widgets-hide'

import unsorted from '../components/unsorted'

export default {
    constriclor() {
        duplicate()
    },

    pipeline() {
        this.constriclor()      
    },

    detail(id) {
        this.constriclor()

        // Подключаем кнопку "Создать клиентскую папку"
        createLeadFolders(id)

        createLeadProject(id)

        // Cебестоимость
        costPrice()

        unsorted()

        widgetsHide()


    }
}