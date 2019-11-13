import page from 'page'
import Leads from './controllers/leads.js'
import Todo from './controllers/todo.js'
import Comtacts from './controllers/contacts.js'

export default function runRouter() {

    // page('*', (ctx, next) => { })

    page('/leads/pipeline/:id?', function(ctx, next) {
        Leads.pipeline()
    })
    page('/leads/detail/:id', function(ctx, next) {
        Leads.detail(ctx.params.id)
    })

    page('/contacts/list/*', function(ctx, next) {
        Comtacts.list()
    })
    page('/contacts/detail/:id', function(ctx, next) {
        Comtacts.detail(ctx.params.id)
    })

    page('/todo/line', Todo.line)

    page()
}