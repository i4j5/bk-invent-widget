import duplicate from '../components/duplicate'

export default {
    constriclor() {
        duplicate()
    },

    list() {
        this.constriclor()  
    },

    detail(id) {
        this.constriclor()
    }
}