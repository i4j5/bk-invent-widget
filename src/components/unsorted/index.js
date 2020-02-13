import * as $ from 'jquery'
import Widget from '../../widget'

export default function unsorted() {

    console.log('unsorted1')

    if ($('.unsorted-actions-card-wrapper').html()) {

        let phone = false
        let widget =  new Widget()

        console.log('unsorted2')

        $('.card-entity-form input.control-phone__formatted, #contacts_list input.control-phone__formatted').each(function(i, elem) {
            if (elem.value) phone = elem.value
        })

        if (phone) {

            //$('body').addClass('page-loading')

            console.log('RUN')

            $.post(
                `//${widget.settings.server}/api/webhook/amocrm/unsorted`,
                {phone}
            ).done(function(res) {
                //$('body').removeClass('page-loading')

                console.log(res)

                if (res.data.id) {
                    let modal_ok = new widget.Modal({
                        class_name: 'modal-window',
                        init: function ($modal_body) {
                            $modal_body
                                .trigger('modal:loaded')
                                .html('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span><h1>Номер присутствует в базе!</h1>')
                                .trigger('modal:centrify')
                                .append('');
                        },
                        destroy: function () {
                        }
                    })
                }
            }).always(function() {
                console.log('GO!')
            })

        }

    }
}