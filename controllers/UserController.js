const { User, Room, Plant } = require('../models')

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
    res.send(userWithPlants)
  } catch (error) {
    throw error
  }
}

const CreateUser = async (req, res) => {
  try {
    let userBody = { ...req.body }
    let user = await User.create(userBody)
    res.send(user)
  } catch (error) {
    throw error
  }
}

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

const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    await User.destroy({ where: { id: userId } })
    res.send({ message: `Deleted user with an id of ${userId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetUsers,
  GetUserPlants,
  CreateUser,
  UpdateUser,
  DeleteUser
}
