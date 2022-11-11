const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.get('/all', controller.GetUsers)
Router.get('/:user_id/', controller.GetUserPlants)

module.exports = Router
