import * as $ from 'jquery'

export default function widgetsHide() {

    $('.card-widgets').css({ 
        'display': 'none',
    })

    $('.card-holder').css({ 
        'right': '0px',
    })
}