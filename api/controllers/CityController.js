const { ErrorNotFound } = require('../../errors')
const { CitySerializer } = require('../serializer')
const { CityServices} = require('../services')
const cityServices = new CityServices()

class CityController {

    getList = (req, res, next) => {

        const serializer = new CitySerializer(res.getHeader('Content-Type'), ['version'])

        cityServices.getAll(req.query)
        .then(result => {

            if( result.count ){

                res.status(200).send(serializer.serialize(result))

            } else throw new ErrorNotFound('Cities')
        })
        .catch(error => next(error))
    }

    getById = (req, res, next) => {

		let id = req.params.id

        const serializer = new CitySerializer(res.getHeader('Content-Type'),
        ['createdAt', 'updatedAt', 'deletedAt', 'version'])

        cityServices.getById(id)
        .then(result =>  {

            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(serializer.serialize(result))

            }else throw new ErrorNotFound('City')
        })
        .catch(error => next(error))
    }

    getHeadById = (req, res, next) => {

        const id = req.params.id

        cityServices.getById(id)
        .then(result =>  {

            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).end()

            }else throw new ErrorNotFound('City')
        })
        .catch(error => next(error))
    }

	getByState = (req, res, next) => {
        
        const state = req.params.state
        
        const serializer = new CitySerializer(res.getHeader('Content-Type'),
        ['createdAt', 'updatedAt', 'deletedAt', 'version'])

        cityServices.getByState(state)
        .then(result =>  {

            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(serializer.serialize(result))

            }else throw new ErrorNotFound('City')
        })
        .catch(error => next(error))
    }

    add = async (req, res, next) => {
        
        const city = req.body

        const serializer = new CitySerializer(res.getHeader('Content-Type'),
        ['createdAt', 'updatedAt', 'deletedAt', 'version'])

        cityServices.add(city)
        .then(result => {
            console.log(result)
            const timestamp = new Date(result.updatedAt)
            res.set('Last-Modified', timestamp)
            res.set('ETag', result.version)
            res.set('Location', `/api/city/${result.id}`)

			res.status(201).send(serializer.serialize(result))
        })
        .catch(error => next(error))
    }

    update = async (req, res, next) => {
		
		let id = req.params.id
		let city = req.body

        cityServices.update(city, { id: id })
        .then( async result => {

            if( result ){

                result = await cityServices.getById(id)

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.set('Location', `/api/cities/${result.id}`)
                res.status(204).end()

            }else throw new ErrorNotFound('City')

        })
        .catch(error => next(error))
    }

    delete = (req, res, next) => {

        const id = req.params.id

        cityServices.delete(id)
        .then(result => {

            if( result )  res.status(204).end()

            else throw new ErrorNotFound('City')
        })
        .catch(error => next(error))
    }

    restore = (req, res, next) => {

        const id = req.params.id

        cityServices.restore(id)
        .then(async result => {

            if( result ){

                result = await cityServices.getById(id)

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(204).end()

            } else throw new ErrorNotFound('City')
        })
        .catch(error => next(error))
    }
}

module.exports = new CityController()