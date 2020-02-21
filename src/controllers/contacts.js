import tags from '../components/tags'

export default {
    constriclor() {
        tags()
    },

    list() {
        this.constriclor()  
    },

    detail(id) {
        this.constriclor()
    }
}