const { User, Plant } = require('../models')
const middleware = require('../middleware')
const validator = require('email-validator')

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

//Authentication controllers
const RegisterUser = async (req, res) => {
  try {
    const { email, password, name } = req.body
    let userExists = await User.findOne({ where: { email } })
    if (userExists) {
      return res.send(`That Email Already Exists`)
    } else {
      let validEmail = validator.validate(email)
      if (!validEmail) {
        return res.send(`Invalid Email Format`)
      } else {
        let passwordDigest = await middleware.hashPassword(password)
        const user = await User.create({ email, passwordDigest, name })
        res.send(user)
      }
    }
  } catch (error) {
    throw error
  }
}

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
        email: user.email,
        name: user.name
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    // return res.send(`Error Logging In`)
    res.status(401).send({ status: 'Error', msg: 'Login Error' })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

// Update User handles ALL update requests (including password changes), and must be confirmed by current password
const UpdateUser = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, email, newPassword, password, userId } = req.body

    //confirm password
    const user = await User.findByPk(userId)
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        password
      ))
    ) {
      // if password is confirmed, set update body
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
      let updateConfirm = await User.update(updateBody, {
        where: { id: userId },
        returning: true
      })
      console.log(updateConfirm)
      return res.send(updateConfirm)
    }
    console.log('C')
    res
      .status(401)
      .send({ status: 'Error', msg: 'password does not stored password' })
  } catch (error) {
    // console.log('D')
    throw error
  }
}

// JAL - this should cascade to plants and rooms, but it doesn't currently
const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    // await User.destroy({ where: { id: userId } })
    let user = await User.findOne({ where: { id: userId } })
    await user.destroy()
    //this should cascade to all the users plants and rooms, but it didn't.... hmm... could add another couple lines of code here to clean up the plants and rooms.
    res.send({
      message: `Deletion Confirmed: User: ${userId}`
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllUsers,
  Login,
  RegisterUser,
  CheckSession,
  UpdateUser,
  DeleteUser
}
