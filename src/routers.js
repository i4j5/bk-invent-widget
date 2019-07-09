import page from 'page'
import Leads from './controllers/leads.js'
import Todo from './controllers/todo.js'

export default function runRouter(crm, server, user) {

    page('/leads/pipeline/:id?', function(ctx, next) {
        Leads.pipeline()
    })

    page('/leads/detail/:id', function(ctx, next) {
        Leads.detail(ctx.params.id)
    })

    page('/todo/line', Todo.line)

    page()
}