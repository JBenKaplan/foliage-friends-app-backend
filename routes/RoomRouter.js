const Router = require('express').Router()
const controller = require('../controllers/RoomController.js')
const middleware = require('../middleware')

Router.get('/all', controller.GetRooms)
Router.get('/userRooms', controller.GetUserRooms)
Router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRoom
)
Router.put('/', controller.UpdateRoom)
Router.delete('/:user_id', controller.DeleteRoom)

module.exports = Router
