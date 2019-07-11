import * as $ from 'jquery'
import duplicate from '../components/duplicate'

export default {
    constriclor() {
        duplicate()
    },

    list() {
        this.constriclor()  

        // $(document).on('change', '#list_table', function() {
        //     console.log('))!')
        // })
    },

    detail(id) {
        this.constriclor()
    }
}