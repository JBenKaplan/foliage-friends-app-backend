const { User, Plant } = require('../models')
const middleware = require('../middleware')

//Authentication controllers
const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized!' })
  } catch (error) {
    throw error
  }
}

const RegisterUser = async (req, res) => {
  try {
    const { email, password, name } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({ email, passwordDigest, name })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        req.body.oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword)
      // await user.update({ passwordDigest })
      // TESTING - when using randomly seeded users // when done, switch below to above
      await user.update({
        passwordDigest,
        name: `seeder: pw: ${req.body.newPassword}`
      })
      return res.send({ status: 'Success', msg: 'Password has been updated!' })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized!' })
  } catch (error) {
    throw error
  }
}

//User Controllers
const UpdateUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let updatedUser = await User.update(req.body, {
      where: { id: userId },
      returning: true
    })
    res.send(updatedUser)
  } catch (error) {
    throw error
  }
}

const GetUsers = async (req, res) => {
  try {
    const user = await User.findAll()
    res.send(user)
  } catch (error) {
    throw error
  }
}

const GetUserPlants = async (req, res) => {
  try {
    const userWithPlants = await User.findByPk(req.params.user_id, {
      include: Plant
    })
    if (userWithPlants) {
      return res.send(userWithPlants)
    }
    res.status(401).send({ status: 'Error', msg: 'No User found with that id' })
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  /*
   expects
   req.header.authorization = { Bearer: token } //won't get to this point if token is not verified in UserRouter.js
   req.body = { email: email, password: password }
  */

  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: { email }
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        password
      ))
    ) {
      await User.destroy({ where: { email } }) // or where : { id: user.id }
      // res.send({ message: `Deleted user with an email of: ${email}` })
      return res.send({ message: `Deleted user` })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized!' })
    // let userId = parseInt(req.params.user_id)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  GetUsers,
  GetUserPlants,
  RegisterUser,
  UpdatePassword,
  UpdateUser,
  DeleteUser
}
