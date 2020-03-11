import * as $ from 'jquery'
import Widget from '../../widget'

export default function search() {
    let widget = new Widget()
    let system = widget.super.system()

    $('.i4j5-search').off('click')
    $('.i4j5-search').click(function(event) {
        event.stopPropagation()
        event.preventDefault()

        let $this = $(this)

        let str = $this.data('search')
        let type = $this.data('type')
        
        switch (type) {
            case 'contact':
                window.open(`//${system.domain}/contacts/list/?&term=${str}`, '_blank')
                break;
        
            default:
                break;
        }
    })

}
