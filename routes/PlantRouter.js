const Router = require('express').Router()
const controller = require('../controllers/PlantController.js')
const middleware = require('../middleware')

Router.get('/all', controller.GetAllPlants)
Router.get('/plant/:plant_id/', controller.GetPlantById)
Router.get('/room/:room_id/', controller.GetAllPlantsByRoom)
Router.get('/user/:user_id/', controller.GetAllPlantsByUser)
Router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreatePlant
)
Router.put(
  '/updateplant',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePlant
)
Router.delete(
  'plant/:plant_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePlant
)

module.exports = Router
