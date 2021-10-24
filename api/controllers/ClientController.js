const { ClientSerializer } = require('../serializer')
const { ClientServices} = require('../services')
const clientServices = new ClientServices()

class ClientController {

    getList = (req, res, next) => {

        const serializer = new ClientSerializer(res.getHeader('Content-Type'), ['version'])

        clientServices.getAll(req.query)
        .then(result => {

            if( result ){

                res.status(200).send(serializer.serialize(result))

            } else throw new ErrorNotFound('Clients')
        })
        .catch(error => next(error))
    }

    getById = (req, res, next) => {

		let id = req.params.id

        const serializer = new ClientSerializer(res.getHeader('Content-Type'),
        ['createdAt', 'updatedAt', 'deletedAt', 'version'])

        clientServices.getById(id)
        .then(result =>  {

            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(serializer.serialize(result))

            }else throw new ErrorNotFound('Client')
        })
        .catch(error => next(error))
    }

    getHeadById = (req, res, next) => {

        const id = req.params.id

        clientServices.getById(id)
        .then(result =>  {

            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).end()

            }else throw new ErrorNotFound('Client')
        })
        .catch(error => next(error))
    }

	getByName = (req, res, next) => {

        const name = req.params.name

        clientServices.getByName(name)
        .then(result =>  {

            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(result)

            }else throw new ErrorNotFound('Client')
        })
        .catch(error => next(error))
    }

    add = async (req, res, next) => {
        
        const client = req.body

        const serializer = new ClientSerializer(res.getHeader('Content-Type'),
        ['createdAt', 'updatedAt', 'deletedAt', 'version'])

        clientServices.add(client)
        .then(result => {

            const timestamp = new Date(result.updatedAt)
            res.set('Last-Modified', timestamp)
            res.set('ETag', result.version)
            res.set('Location', `/api/client/${result.id}`)

            res.status(201).send(serializer.serialize(result))
        })
        .catch(error => next(error))
    }

    update = async (req, res, next) => {
		
		let id = req.params.id
		let client = req.body

        clientServices.update(client, { id: id })
        .then( async result => {

            if( result ){

                result = await clientServices.getById(id)

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.set('Location', `/api/clients/${result.id}`)
                res.status(204).end()

            }else throw new ErrorNotFound('Client')

        })
        .catch(error => next(error))
    }

    delete = (req, res, next) => {

        const id = req.params.id

        clientServices.delete(id)
        .then(result => {

            if( result )  res.status(204).end()

            else throw new ErrorNotFound('Client')
        })
        .catch(error => next(error))
    }

    restore = (req, res, next) => {

        const id = req.params.id

        clientServices.restore(id)
        .then(async result => {

            if( result ){

                result = await clientServices.getById(id)

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(204).end()

            } else throw new ErrorNotFound('Client')
        })
        .catch(error => next(error))
    }
}

module.exports = new ClientController()