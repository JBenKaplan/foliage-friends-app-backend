const Router = require('express').Router()
const controller = require('../controllers/RoomController.js')
const middleware = require('../middleware')

Router.get('/all', controller.GetRooms)
Router.get('/:user_id', controller.GetUserRooms)
Router.get('/room/:room_id', controller.GetRoomById)
Router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRoom
)
Router.put(
  '/:room_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateRoom
)
Router.delete(
  '/:room_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteRoom
)

module.exports = Router
