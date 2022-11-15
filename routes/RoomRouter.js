const Router = require('express').Router()
const controller = require('../controllers/RoomController.js')
const middleware = require('../middleware')


Router.get('/all', controller.GetAllRooms) // testing route
Router.get('/user/:user_id', controller.GetRoomsByUser)
Router.get('/room/:room_id', controller.GetRoomById)

Router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRoom
)

Router.put(
  '/update',

  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateRoom
)

Router.delete(
  '/room/:room_id',

  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteRoom
)

module.exports = Router
