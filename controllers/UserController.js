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
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
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

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

//User Controllers
// const UpdatePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body
//     const user = await User.findByPk(req.params.user_id)
//     if (
//       user &&
//       (await middleware.comparePassword(
//         user.dataValues.passwordDigest,
//         oldPassword
//       ))
//     ) {
//       let passwordDigest = await middleware.hashPassword(newPassword)
//       await user.update({ passwordDigest })
//       return res.send({ status: 'Ok', payload: user })
//     }
//     res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
//   } catch (error) {}
// }
const UpdateUser = async (req, res) => {
  // this function will handle ALL user update requests (name, email, pw... all confirmed with current pw)
  try {
    console.log(req.body.updateFormValues)
    const { name, email, newPassword, password } = req.body.updateFormValues
    let userId = parseInt(req.body.updateFormValues.userId)
    //confirm password
    const user = await User.findByPk(userId)
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        password
      ))
    ) {
      //do things here, if password was confirmed
      //set update body
      let updateBody = {}
      if (name) {
        updateBody.name = name
      }
      if (email) {
        updateBody.email = email
      }
      if (newPassword) {
        let passwordDigest = await middleware.hashPassword(newPassword)
        updateBody.passwordDigest = passwordDigest
      }
      //send the update request
      let updatedUser = await User.update(updateBody, {
        where: { id: userId },
        returning: true
      })
      return res.send(updatedUser)
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'password does not stored password' })
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
  // req.header.authorization = { Bearer: token }
  // req.body = { email: email, password: password }
  try {
    // const { email, password } = req.body
    // const user = await User.findOne({ where: { email } })
    // if (
    //   user &&
    //   (await middleware.comparePassword(
    //     user.dataValues.passwordDigest,
    //     password
    //   ))
    // ) {
    //   const userPlants = await User.findAll(
    //     { where: { email } },
    //     { include: Plant }
    //   )
    //   return res.send(userPlants)
    // }
    // res.status(401).send({ status: 'Error', msg: 'No User found with that id' })
    const userPlants = await Plant.findAll()
    res.send(userPlants)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  /*
   expects
   req.header.authorization = { Bearer: token } //won't get to this point if token is not verified in UserRouter.js
   // wanted to use: req.body = { email: email, password: password }, but Delete requests do NOT carry req.body. must come in through req.params (or req.query?)
  */
  try {
    let userId = parseInt(req.params.user_id)
    await User.destroy({ where: { id: userId } })
    //this should cascase to all the users plants and rooms, but it didn't.... hmm... could add another couple lines of code here to clean up the plants and rooms.
    res.send({
      message: `Deletion Confirmed: Plant: ${userId}`
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  GetUsers,
  GetUserPlants,
  RegisterUser,
  // UpdatePassword,
  UpdateUser,
  DeleteUser,
  CheckSession
}
