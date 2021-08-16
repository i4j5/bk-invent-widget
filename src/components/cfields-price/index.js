import * as $ from 'jquery'
import * as tmpl from './tmpl.pug'
import Widget from '../../widget'
import * as btnTmpl from './btn.pug'
import * as modalTmpl from './modal.pug'
import * as modalOkTmpl from './modal-ok.pug'

export default function cfieldsPrice(lead_id) {

    let widget = new Widget()
    let system = widget.super.system()

    let domen_api = 'bkinvent.na4u.ru' 

    let arr = [
        329031, 
        329033, 
        329027, 
        329025,
        75197,
        506505
    ]

    arr.forEach(id => {
        if (!$(`.i4j5-cost-price[data-id="${id}"]`).html()) {
            let $costPrice = $(`.linked-form__field__value input[name="CFV[${id}]"]`)
            let _val = $costPrice.val()
    
            $costPrice.attr('placeholder','')
            $costPrice.attr('type','hidden')
            $costPrice.addClass('js-control-raw-price text-input')
    
            let $parentСostPrice = $costPrice.parent()
            $parentСostPrice.addClass('card-budget linked-form__field-text')
    
    
            let $controlCostPrice = $(tmpl({
                'id': id
            }))
    
            $parentСostPrice.append($controlCostPrice)
            $costPrice.appendTo(`.i4j5-cost-price[data-id="${id}"]`)
    
            if (+_val) {
                $controlCostPrice.children('.js-control-pretty-price').val(parseInt(+_val).toLocaleString('ru-RU'))
            }
        }
    })

    const $fieldBudget = $('#lead_card_budget') 
    const $fieldCostPrice = $('.i4j5-cost-price[data-id="75197"] input.js-control-pretty-price')
    const $allCostPrice = $('.i4j5-cost-price[data-id="329025"] input.js-control-pretty-price, .i4j5-cost-price[data-id="329027"] input.js-control-pretty-price')
    const $allBudget = $('.i4j5-cost-price[data-id="329033"] input.js-control-pretty-price, .i4j5-cost-price[data-id="329031"] input.js-control-pretty-price')

    $('[name="CFV[518605]"]').prop('disabled', true)

    const $fieldPaid = $('.i4j5-cost-price[data-id="506505"] input.js-control-pretty-price')
    
    if ($fieldPaid.length === 1) { 
        $fieldPaid.prop('disabled', true)
        $fieldPaid.parent().parent().parent().before('<div class="i4j5-br" />')
        $fieldPaid.parent().parent().addClass('i4j5-paid')
        $fieldPaid.parent().parent().parent().after('<div class="i4j5-payments"></div>')

        // i4j5-payments__delete

        loadingPayments($fieldPaid, system.domain, domen_api, lead_id)

        $(document).on('click', '.i4j5-payments__delete', function(e){
            let payment_id = $(this).data('id')

            // Блокировака

            $.ajax({
                url: `//${domen_api}/api/payment/${payment_id}`,
                type: 'delete',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                // data: {
                //     id: $(this).data('id')
                // }
            }).done(function(res) {
                loadingPayments($fieldPaid, system.domain, domen_api, lead_id)
            })
        });
    }

    if ($allCostPrice.length === 2 && $allBudget.length === 2 && $fieldBudget.length === 1 && $fieldCostPrice.length === 1) {
        $fieldBudget.prop('disabled', true)
        $fieldBudget.parent().parent().append('<span class="i4j5-debt" />') 
        $fieldCostPrice.prop('disabled', true)

        $fieldCostPrice.parent().parent().parent().before('<div class="i4j5-br" />')

        debt()
    
        $allCostPrice.on('input', function () {
            let sum = 0
            $allCostPrice.each((index) => {
                let val = $($allCostPrice[index]).val()
                val = val.replace(/\D/g, '').trim()
                sum = sum + parseInt(+val)
            })
            if (sum == 0) {
                sum = ''
            }
            $fieldCostPrice.val(sum).trigger('input')
        })
    
        $allBudget.on('input', function () {
            let sum = 0
            $allBudget.each((index) => {
                let val = $($allBudget[index]).val()
                val = val.replace(/\D/g, '').trim()
                sum = sum + parseInt(+val)
            })
            if (sum == 0) {
                sum = ''
            }
            $fieldBudget.val(sum).trigger('input')
            debt()
        })
    }


    if ($('#i4j5-create-payment').html()) $('#i4j5-create-payment').detach()
    $('.card-holder .card-fields__top-name-more .button-input-more .button-input__context-menu').prepend(btnTmpl())

    let openModal = true
    $(document).off('click', '#i4j5-create-payment')
    $(document).on('click', '#i4j5-create-payment', function(event) {
        openModal = false

        let modal = new widget.Modal({
            class_name: 'modal-window',
            init: function ($modal_body) {
                $modal_body
                    .trigger('modal:loaded')
                    .html(modalTmpl({
                        lead_id,
                    }))
                    .trigger('modal:centrify')
                    .append('');
            },
            destroy: function () {
                openModal = true
                $(document).off('submit', '#i4j5-create-payment__form')
            }
        })

        let ajax = true
        $(document).on('submit','#i4j5-create-payment__form', function (event) {
            event.preventDefault()
            event.stopPropagation()

            if (ajax) {

                let $sum = $('#i4j5-create-payment__sum')
                let $type = $('#i4j5-create-payment__type')
                let $date = $('#i4j5-create-payment__date')
                
                let validation = true
                $sum.removeClass('i4j5-input-error')
                $type.parent().children('.control--select--button').removeClass('i4j5-input-error')
                $date.removeClass('i4j5-input-error')
        

                if (!$sum.val()) {
                    validation = false
                    $sum.addClass('i4j5-input-error')
                } else {
                    let sum = parseInt($sum.val())

                    if (!sum) {
                        validation = false
                        $sum.addClass('i4j5-input-error')
                    } else if (isNaN(sum)) {
                        validation = false
                        $sum.addClass('i4j5-input-error')
                    } else {
                        $sum.val(sum)
                    }
                }


                if (!$type.val()) {
                    validation = false
                    $type.parent().children('.control--select--button').addClass('i4j5-input-error')
                }
                    

                if (!$date.val()) {
                    validation = false
                    $date.addClass('i4j5-input-error')
                } else {
                    //let date = new Date($date.val())

                    // if (date.toDateString() == 'Invalid Date') {
                    //     validation = false
                    //     $date.addClass('i4j5-input-error')
                    // } else {
                       
                        // let day  = date.getDate()
                        // day = day < 10 ? '0' + day : day

                        // let month = date.getMonth() + 1
                        // month = month < 10 ? '0' + month : month

                        // let year = date.getFullYear()

                        // let hours =  date.getHours()
                        // hours = hours < 10 ? '0' + hours : hours

                        // let minutes =  date.getMinutes()
                        // minutes = minutes < 10 ? '0' + minutes : minutes

                        // console.log(date,`${day}.${month}.${year} ${hours}:${minutes}` )

                        // $date.val( `${day}.${month}.${year} ${hours}:${minutes}` )
                    // }
                }



                let data = {
                    'deal_id': lead_id,
                    'type': $('#i4j5-create-payment__type').val(),
                    'sum': $('#i4j5-create-payment__sum').val(),
                    'description': $('#i4j5-create-payment__description').val(),
                    'date': $('#i4j5-create-payment__date').val(),
                }

                if (validation) {
                    modal.destroy()
                    $('body').addClass('page-loading');

                    ajax = false

                    $.post(`//${domen_api}/api/payment`, data).done(function(res) {
                        $('body').removeClass('page-loading')


                        if (res.id) {
                            loadingPayments($fieldPaid, system.domain, domen_api, lead_id)
                        }
                        
                        let modal_ok = new widget.Modal({
                            class_name: 'modal-window',
                            init: function ($modal_body) {
                                $modal_body
                                    .trigger('modal:loaded')
                                    .html(modalOkTmpl())
                                    .trigger('modal:centrify')
                                    .append('');
                            },
                            destroy: function () {
                            }
                        })

                        setTimeout(function() {
                            modal_ok.destroy()
                        }, 700)
        
                        ajax = true
                    })
                }
            }
        });
    })
    
}

function debt() {
    let budget = $('#lead_card_budget').val()
    let paid = $('.i4j5-cost-price[data-id="506505"] input.js-control-pretty-price').val()
    
    budget = budget.replace(/\D/g, '').trim()
    paid = paid.replace(/\D/g, '').trim()

   let debt = budget - paid
   debt = parseInt(+debt).toLocaleString('ru-RU')

    $('.i4j5-debt').html(debt)
}

function loadingPayments($fieldPaid, domain, domen_api, lead_id) {

    let $payments = $('.i4j5-payments')
    $payments.html('<span class="spinner-icon i4j5-load"></span>')

    $.ajax({
        url: `//${domen_api}/api/payment?deal_id=${lead_id}`,
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    }).done(function(res) {

        let sum = 0

        let items = JSON.parse(res)

        $payments.html('')

        $.each(items, function (index, item) {               
            sum = sum + parseInt(item.sum)


            let date = item.date
            let day = date.substring(8,10)
            let month = date.substring(5,7)
            let year = date.substring(0,4)
            let hours = date.substring(11,13)
            let minutes = date.substring(14,16)

            date = new Date(`${year}-${month}-${day} ${hours}:${minutes}`)
            date = date.toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).replace('г.,', 'в ')

            // console.log(item.date, `${year}-${month}-${day} ${hours}:${minutes}`)

            let description = ''
            if (item.description) {
                description = `<div class="i4j5-payments__description">(${item.description})</div>`
            }


            let item_html = `<div class="i4j5-payments__item linked-form__field linked-form__field-numeric">
                <div class="linked-form__field__label i4j5-payments__label">
                    <div>
                        <svg class="svg-card-calendar-dims">
                            <use xlink:href="#card-calendar" style="fill: #909090;"></use>
                        </svg>&thinsp;
                        ${date}
                        
                        ${description}
                    </div>
                </div>

                <div class="linked-form__field__value"> 
                    <span>${parseInt(+item.sum).toLocaleString('ru-RU')} ₽ <span class="i4j5-payments__type">(${item.type})</span> </span>
                    <span data-id="${item.id}" class="i4j5-payments__delete list-multiple-actions__item__icon icon icon-delete-trash"></span>
                </div>
            </div>`;

            $payments.append(item_html)
        })


        $('.i4j5-payments__item').hover(function(){
            let $this = $(this)

            let $deleteBtn = $this.find('.i4j5-payments__delete')

            $deleteBtn.addClass('i4j5-payments__delete_hover')
        }, function() {
            $(this).find('.i4j5-payments__delete').removeClass('i4j5-payments__delete_hover')
        })

        
        if (sum == 0) {
            sum = ''
        }

        if (sum == $fieldPaid.val()) {
            debt()
        } else {
            // Обновить поле 

            let fully_paid_for = 0;
            if (sum == $('#lead_card_budget').val().replace(/\D/g, '').trim()) {
                fully_paid_for = 1 
            }

            $.ajax({
                url: `//${domain}/api/v2/leads`,
                type: 'post',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                data: {
                    update: [{
                        id: lead_id,
                        custom_fields: [
                            {
                                id: '506505',
                                values: [{
                                    value: sum
                                }]
                            },
                            {
                                id: '518605',
                                values: [{
                                    value: fully_paid_for
                                }]
                            }
                        ],
                        updated_at: new Date().getTime(),
                    }]
                }
            }).done(function(res){
                $fieldPaid.val(sum).trigger('input')

                debt()
            })
        }

    })
}