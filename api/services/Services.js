const Sequelize = require('sequelize')
const Op = Sequelize.Op
const database = require('../models')

class Services {
    constructor(modelName) {
        this.modelName = modelName
    }

    async getAll({ id, name = '', state = '', page = 1, limit = 10, reverse = false} = {}) {
        
        const where = {}
        id ? where.id = id : null
        name ? where.name = name : null
        state ? where.state = state : null
        
        const options = {
            raw: true,
            where: where,
            limit: limit,
            offset: ((page ? page : 1)-1)*limit,
            order: [['createdAt', (reverse ? 'DESC' : 'ASC')]]
        }

        let result = await database[this.modelName].findAndCountAll(options)
        
        return result
    }

    async getById(id) {

        const options = {
            raw: true,
            where: {
                id: id
            }

        }

        let result = await database[this.modelName].findAll(options)
        console.log(result)
        return result[0]
    }

    async add(data) {

        let result = await database[this.modelName].create(data)
        console.log(data, result.get())
        return (result ? result.get() : null)
    }

    async update(data, where, transaction = {}) {

        const options = {
            where
        }

        let result = await database[this.modelName].update(data, options, transaction)

        return result[0]
    }

    async delete(id) {

        const options = {
            where: {
                id: id
            }
        }

        let result = await database[this.modelName].destroy(options)
        return result
    }

    async restore(id) {

        const options = {
            where: {
                id: id
            },
            paranoide: false
        }

        return database[this.modelName].restore(options)
    }
}

module.exports = Services