const Router = require('express').Router()
const controller = require('../controllers/PlantController.js')
const middleware = require('../middleware')


Router.get('/all', controller.GetAllPlants) // testing route


Router.get(
  '/user/:user_id/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetPlantByUser
)

Router.get(
  '/room/:room_id/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetPlantByRoom
)

Router.get('/plant/:plant_id/', middleware.stripToken, middleware.verifyToken, controller.GetPlantById)

Router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreatePlant
)

Router.put(
  '/update',
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
