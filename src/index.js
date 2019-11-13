import './style.sass'
import runRouter from './routers'
import Widget from './widget'

window.WidgetI4J5init = function(settings, self, Modal) {
	
	new Widget(settings, self, Modal);

	runRouter()
}