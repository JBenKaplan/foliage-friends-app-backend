const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

Router.get('/all', controller.GetUsers)

Router.post('/login', controller.Login)

Router.get(
  '/plants',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserPlants
)
Router.post('/register', controller.RegisterUser)

Router.put(
  '/update',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateUser
)

Router.delete(
  '/delete/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser
)

Router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = Router
