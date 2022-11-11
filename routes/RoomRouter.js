const Router = require('express').Router()
const controller = require('../controllers/RoomController.js')

Router.get('/all', controller.GetRooms)
Router.post('/create', controller.CreateRoom)
Router.put('/', controller.UpdateRoom)
Router.delete('/:user_id', controller.DeleteRoom)

module.exports = Router
