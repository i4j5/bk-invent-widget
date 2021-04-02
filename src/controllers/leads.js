import tags from '../components/tags'
import cfieldsPrice from '../components/cfields-price'
import createLeadFolders from '../components/create-lead-folders'
import createLeadProject from '../components/create-lead-project'
import createGoogleCalendarEvent from '../components/create-google-calendar-event'
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
        
        cfieldsPrice(id)

        createLeadFolders(id)

        createLeadProject(id)

        // createGoogleCalendarEvent(id)

        

        unsorted()

        widgetsHide()

        double()
        //search()
        $('#person_n').unbind('keyup')
        $('#person_n').on('keyup', function(e) {
            let $this = $(this);
            $this.val($this.val().toUpperCase());
        });

    }
}