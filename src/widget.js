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

	constructor(account, system, user, settings) {

        if (!instance) {
            this.account = account
            this.system = system
            this.user = user
            this.settings = settings
            instance = this
        }
        
        return instance;
    }
    
}

export default Widget