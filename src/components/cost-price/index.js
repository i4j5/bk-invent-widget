import * as $ from 'jquery'
import * as tmpl from './tmpl.pug'

export default function costPrice() {
    let $costPrice = $('.linked-form__field__value input[name="CFV[240621]"]')
    let _val = $costPrice.val()

    $costPrice.attr('placeholder','')
    $costPrice.attr('type','hidden')
    $costPrice.addClass('js-control-raw-price text-input')

    let $parentСostPrice = $costPrice.parent()
    $parentСostPrice.addClass('card-budget linked-form__field-text')


    let $controlCostPrice = $(tmpl())

    $parentСostPrice.append($controlCostPrice)
    $costPrice.appendTo('#i4j5-cost-price')

    if (+_val) {
        $controlCostPrice.children('.js-control-pretty-price').val(parseInt(+_val).toLocaleString('ru-RU'))
    }
    
}