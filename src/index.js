import './style.sass'
import runRouter from './routers'
import Widget from './widget'

window.WidgetI4J5init = function(account, system, user, settings) {
	
	new Widget(account, system, user, settings);

	runRouter()
}