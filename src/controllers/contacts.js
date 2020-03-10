import tags from '../components/tags'
import double from '../components/double'

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
    }
}