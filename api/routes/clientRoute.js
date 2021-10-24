const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/ClientController')
const { checkErrors } = require('../validations').routeControl
const clientValidations = require('./../validations').clientValidations

router.options('/:id', (req, res, next) => {
  res.status(204).end()
})

// Returns all clients not deleted
router.get('/', clientValidations.getAll, checkErrors, ClientController.getList)

// It must be declared before any get route with the same signature.
// Otherwise, the head request will be accepted by the GET route. GET routes in Express accepts both GET and HEAD requests.
router.head('/:id', clientValidations.getById, checkErrors, ClientController.getHeadById)

// Returns a client by id
router.get('/:id', clientValidations.getById, checkErrors, ClientController.getById)

// Creates a new client
router.post('/', clientValidations.add, checkErrors, ClientController.add)

// Updates a client
router.put('/:id', clientValidations.update, checkErrors,ClientController.update)

// Sets a client as deleted
router.delete('/:id', clientValidations.getById, checkErrors, ClientController.delete)

// Restores previously deleted client
router.post('/:id/restore', clientValidations.getById, checkErrors, ClientController.restore)

module.exports = function (app) {
    app.use('/api/clients', router)
  }