const Router = require('express').Router()
const controller = require('../controllers/PlantController.js')

Router.get('/all', controller.GetPlants)

module.exports = Router
