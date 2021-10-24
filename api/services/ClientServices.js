const Services = require('./Services')

class ClientServices extends Services{
    constructor(){
        super('clients')
    }
}

module.exports = ClientServices