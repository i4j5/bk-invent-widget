import duplicate from '../components/duplicate'
import costPrice from '../components/cost-price'
import createLeadFolders from '../components/create-lead-folders'

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

        // Cебестоимость
        costPrice()
    }
}