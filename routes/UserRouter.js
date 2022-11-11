const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.get('/all', controller.GetUsers)
Router.get('/:user_id/', controller.GetUserPlants)
Router.post('/create', controller.CreateUser)
Router.put('/', controller.UpdateUser)
Router.delete('/:user_id', controller.DeleteUser)

module.exports = Router
