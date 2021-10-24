const express = require('express')
const app = express()

const { ErrorNotAcceptedType } = require('./errors')
const acceptedTypes = require('./api/serializer').acceptedTypes
const ErrorSerializer = require('./api/serializer').ErrorSerializer
const { loadRoutes, getRequiredType } = require('./functions/appFunctions')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.all('*', (req, res, next) => {
	res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD')
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
	res.set('Access-Control-Allow-Credentials', true)
	res.set('Access-Control-Allow-Origin', req.headers.origin)
	next()
})

app.use((req, res, next) => {

    let requiredType = req.header('Accept')

    requiredType = getRequiredType(requiredType, acceptedTypes)

    if (!requiredType) throw new ErrorNotAcceptedType(requiredType)

    const developedBy = process.env.DEVELOPED_BY

    res.setHeader('X-Powered-By', developedBy)
    res.setHeader('Content-Type', requiredType)

    next()
})

loadRoutes(app)

app.use((error, req, res, next) => { console.log(error)

    let status = (error.status || 500)

    const errorSerializer = new ErrorSerializer(res.getHeader('Content-Type'))

    if(error.errors) error = error.errors

    res.status(status).send(errorSerializer.serialize(error))
})

module.exports = app