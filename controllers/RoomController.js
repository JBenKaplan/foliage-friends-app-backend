const { User, Room, Plant } = require('../models')

const GetRooms = async (req, res) => {
  try {
    const room = await Room.findAll()
    res.send(room)
  } catch (error) {
    throw error
  }
}

const CreateRoom = async (req, res) => {
  try {
    // const { name, userId } = req.body // JAL version - same?
    let roomBody = { ...req.body } // JBK version - same?
    // how do we ensure that the userId matches the current token?

    let room = await Room.create(roomBody)
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
  CreateRoom,
  UpdateRoom,
  DeleteRoom
}
