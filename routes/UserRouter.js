const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

Router.post('/login', controller.Login)
Router.get('/:user_id/', controller.GetUserPlants)
Router.post('/register', controller.RegisterUser)
Router.put(
  '/updatepassword',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
// Router.get('/session', controller.CheckSession)
Router.delete('/:user_id', controller.DeleteUser)

module.exports = Router
