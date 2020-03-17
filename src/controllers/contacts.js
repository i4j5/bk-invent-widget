import tags from '../components/tags'
import double from '../components/double'
import widgetsHide from '../components/widgets-hide'

export default {
    constriclor() {
        tags()
    },

    list() {
        this.constriclor()  
    },

    detail(id) {
        this.constriclor()
        double()
        widgetsHide()
    }
}