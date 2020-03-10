import tags from '../components/tags'
import costPrice from '../components/cost-price'
import createLeadFolders from '../components/create-lead-folders'
import createLeadProject from '../components/create-lead-project'
import widgetsHide from '../components/widgets-hide'
import spam from '../components/spam'
import double from '../components/double'
//import search from '../components/search'
import unsorted from '../components/unsorted'

export default {
    constriclor() {
        tags()
    },

    pipeline() {
        this.constriclor()      
    },

    detail(id) {
        this.constriclor()


        spam(id)

        createLeadFolders(id)

        createLeadProject(id)

        costPrice()

        unsorted()

        widgetsHide()

        double()
        //search()

    }
}