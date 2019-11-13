// import AmoCRM from 'amocrm-js'
// const crm = new AmoCRM({
// 	domain: system.subdomain,
// 	auth: {
// 		login: system.amohash,
// 		hash: system.amouser,
// 	}
// })

let instance = null

class Widget {

	constructor(settings, self, Modal) {

        if (!instance) {
            this.Modal = Modal
            this.settings = settings
            this.super = self
            instance = this
        }
        
        return instance;
    }
    
}

export default Widget