const { User, Room, Plant } = require('../models')

const GetRooms = async (req, res) => {
  try {
    const room = await Room.findAll()
    res.send(room)
  } catch (error) {
    throw error
  }
}

const GetUserRooms = async (req, res) => {
  try {
    const room = await Room.findAll({
      where: {
        userId: req.params.user_id
      }
    })
    res.send(room)
  } catch (error) {
    throw error
  }
}

const CreateRoom = async (req, res) => {
  try {
    const { name, userId } = req.body.room
    console.log(req.body)
    let room = await Room.create({ name, userId })
    res.send(room)
  } catch (error) {
    throw error
  }
}

const UpdateRoom = async (req, res) => {
  try {
    let roomId = parseInt(req.params.room_id)
    let updatedRoom = await Room.update(req.body, {
      where: { id: roomId },
      returning: true
    })
    res.send(updatedRoom)
  } catch (error) {
    throw error
  }
}

const DeleteRoom = async (req, res) => {
  try {
    let roomId = parseInt(req.params.room_id)
    await Room.destroy({ where: { id: roomId } })
    res.send({ message: `Deleted room with an id of ${roomId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetRooms,
  GetUserRooms,
  CreateRoom,
  UpdateRoom,
  DeleteRoom
}
