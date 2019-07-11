import * as $ from 'jquery'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru.js'

// import 'trumbowyg'
// import 'trumbowyg/dist/langs/ru.js'
// import 'trumbowyg/dist/ui/trumbowyg.css'

// import FroalaEditor from 'froala-editor'

// import CKEDITOR from 'ckeditor'
// import 'ckeditor/lang/runEditor.js'



let runEditor = (selector, cb) => {
    ClassicEditor
        .create(document.querySelector('#control-wysiwyg__area'), {
            language: 'ru',
            //toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'textColor', 'bulletedList', 'numberedList', '|', 'undo', 'redo' ],
            // table: {
            //     contentToolbar: [ 'tableRow', 'tableColumn', 'mergeTableCells' ],
            //     tableToolbar: [ 'blockQuote' ]
            // },
            bold: {
                styles: [
                    color => '#d00'
                ]
            }
        }).then(cb) 

}

const Mail = {
    runEditorLead() {
        let editor
        let $feedComposeSwitche =  $('[name="feed-compose-switcher"]')

        if ($feedComposeSwitche.val() == 'email') {

            let $massage = $('.feed-compose__message [name="message"]')
            
            // let $mailTemplate = $('#mail-template')

            runEditor('#control-wysiwyg__area', newEditor => {
                editor = newEditor
                editor.setData($massage.val())
    
                editor.model.document.on('change:data', () => {
                    $massage.val(editor.getData())
                    CKEDITOR.instances.newDotDescriptionFull.getData()
                })
    
                // $mailTemplate.change(() => {
                    
                // // $('.control--select--list--item').click(() => {
                // //     $mailTemplate.trigger('change')
                // //     console.log('1g2g3')
                // // })

                $(document).on('change', '#mail-template', function() {
                    editor.setData($massage.val())
                    console.log('Первый!')
                })
            })
        }

        $('.feed-compose').on("DOMNodeInserted", function (event) { 
            if($(event.target).is('.feed-compose__message')) {
                if ($feedComposeSwitche.val() == 'email') {

                    let $massage = $('.feed-compose__message [name="message"]')
                    
                    runEditor('#control-wysiwyg__area', newEditor => {
                        editor = newEditor
                        editor.setData($massage.val())
            
                        editor.model.document.on('change:data', () => {
                            $massage.val(editor.getData())
                        })
            
                        $('#mail-template').change(() => {
                            editor.setData($massage.val())
                            console.log('_{')
                        })
                    })
                    
                } else {
                    if(editor) {
                        editor.destroy()
                        $('#control-wysiwyg__area').html('')
                    } 
                }
            }
        })
    }
   
}

export default Mail