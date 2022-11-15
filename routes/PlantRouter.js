const Router = require('express').Router()
const controller = require('../controllers/PlantController.js')
const middleware = require('../middleware')

Router.get('/all', controller.GetPlants)
Router.get('/:user_id/', controller.GetPlantByUser)
Router.get('/:room_id/', controller.GetPlantByRoom)
Router.get('/:plant_id/', controller.GetPlantById)
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
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePlant
)

module.exports = Router
