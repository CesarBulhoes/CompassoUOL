const Services = require('./Services')

class CityServices extends Services{
    constructor(){
        super('cities')
    }
}

module.exports = CityServices