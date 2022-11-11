const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

Router.get('/all', controller.GetUsers)
Router.get('/:user_id/', controller.GetUserPlants)
Router.post('/create', controller.RegisterUser)
Router.put(
  '/updatepassword',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
Router.delete('/:user_id', controller.DeleteUser)

module.exports = Router
