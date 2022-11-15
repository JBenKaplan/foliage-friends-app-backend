const { User, Plant } = require('../models')
const middleware = require('../middleware')

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
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({ email, passwordDigest, name })
    res.send(user)
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

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

//User Controllers
// Update User handles ALL update requests (including password changes), and must be confirmed by current password
const UpdateUser = async (req, res) => {
  try {
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

// JAL - this should cascade to plants and rooms, but it doesn't currently
const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    await User.destroy({ where: { id: userId } })
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
