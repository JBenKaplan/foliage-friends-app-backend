const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

//TESTING ROUTE
Router.get('/all', controller.GetUsers)

Router.post('/login', controller.Login)
Router.get('/:user_id/', controller.GetUserPlants)
Router.post('/register', controller.RegisterUser)
Router.put(
  '/updatepassword',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
Router.delete(
  '/delete',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser
)
// Router.get('/session', controller.CheckSession)

module.exports = Router
