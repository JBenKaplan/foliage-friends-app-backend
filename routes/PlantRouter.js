const Router = require('express').Router()
const controller = require('../controllers/PlantController.js')

Router.get('/all', controller.GetPlants)
Router.get('/:user_id/', controller.GetPlantByUser)
Router.post('/create', controller.CreatePlant)
Router.put('/', controller.UpdatePlant)
Router.delete('/:user_id', controller.DeletePlant)

module.exports = Router
