const express = require('express')
const router = express.Router()
const CityController = require('../controllers/CityController')
const { checkErrors } = require('../validations').routeControl
const cityValidations = require('./../validations').cityValidations

router.options('/:id', (req, res, next) => {
  res.status(204).end()
})

// Returns all clients not deleted
router.get('/', cityValidations.getAll, checkErrors, CityController.getList)

// It must be declared before any get route with the same signature.
// Otherwise, the head request will be accepted by the GET route. GET routes in Express accepts both GET and HEAD requests.
router.head('/:id', cityValidations.getById, checkErrors, CityController.getHeadById)

// Returns a city by id
router.get('/:id', cityValidations.getById, checkErrors, CityController.getById)

// Creates a new city
router.post('/', cityValidations.add, checkErrors, CityController.add)

// Updates a city
router.put('/:id', cityValidations.update, checkErrors, CityController.update)

// Sets a city as deleted
router.delete('/:id', cityValidations.getById, checkErrors, CityController.delete)

// Restores previously deleted city
router.post('/:id/restore', cityValidations.getById, checkErrors, CityController.restore)

module.exports = function (app) {
    app.use('/api/cities', router)
  }