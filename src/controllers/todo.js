import * as $ from 'jquery'

export default {
    
    line() 
    {
        let $todo = $('.todo-line__item')

        $todo.each(function(){
            let $text = $(this).find('.todo-line__item-body').html()
            
            if ($text != undefined) {
                let inx = $text.indexOf('@');
                let type = $text[inx+1]

                if (inx > -1) {
                    if (type == 'A'|| type == 'А') {
                        $(this).addClass('i4j5-todo_type_a')
                    } 

                    if (type == 'С'|| type == 'C') {
                        $(this).addClass('i4j5-todo_type_b')
                    }

                    if (type == 'С'|| type == 'C') {
                        $(this).addClass('i4j5-todo_type_c')
                    } 
                }

            }
            
        })
    }

}