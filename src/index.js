import './style.sass'

import AmoCRM from 'amocrm-js'
import runRouter from './routers'

window.WidgetI4J5init = function( account, system, user, settings) {
	const crm = new AmoCRM({
		domain: system.subdomain,
		auth: {
			login: system.amohash,
			hash: system.amouser,
		}
	})
	
	runRouter(crm, settings.server, user)
}
