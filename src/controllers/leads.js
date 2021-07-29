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

        $('#pipeline_2291194_38176489_1709500303').parent().css('display', 'none')

        let leadExchange = $('[value=38176489]').parent()
        if (leadExchange.hasClass('pipeline-select__dropdown__item')) {
            leadExchange.css('display', 'none')
        }

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