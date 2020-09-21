import * as $ from 'jquery'
import * as tmpl from './tmpl.pug'

export default function cfieldsPrice() {

    let arr = [
        329031, 
        329033, 
        329027, 
        329025,
        75197
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

    if ($allCostPrice.length === 2 && $allBudget.length === 2 && $fieldBudget.length === 1 && $fieldCostPrice.length === 1) {
        $fieldBudget.prop('disabled', true)
        $fieldCostPrice.prop('disabled', true)

        $fieldCostPrice.parent().parent().parent().before('<div class="i4j5-br" />')
    
        $allCostPrice.on('input', function () {
            let sum = 0
            $allCostPrice.each((index) => {
                let val = $($allCostPrice[index]).val()
                val = val.replace(/\D/g, '').trim()
                sum = sum + parseInt(+val)
            })
            $fieldCostPrice.val(sum).trigger('input')
        })
    
        $allBudget.on('input', function () {
            let sum = 0
            $allBudget.each((index) => {
                let val = $($allBudget[index]).val()
                val = val.replace(/\D/g, '').trim()
                sum = sum + parseInt(+val)
            })
            $fieldBudget.val(sum).trigger('input')
        })
    }
}