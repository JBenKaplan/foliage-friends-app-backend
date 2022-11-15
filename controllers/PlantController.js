const { User, Room, Plant } = require('../models')

const GetPlants = async (req, res) => {
  try {
    const plant = await Plant.findAll()
    res.send(plant)
  } catch (error) {
    throw error
  }
}

const GetPlantById = async (req, res) => {
  try {
    console.log(req.params)
    let id = parseInt(req.params.plant_id)
    let plant = await Plant.findOne(
      {
        where: { id },
        include: [User, Room]
        // include: User
      }
      // { include: { User, Room } }
      // { include: Room }
    )
    res.send(plant)
  } catch (error) {
    throw error
  }
}

const GetPlantByUser = async (req, res) => {
  try {
    const userAndPlants = await Plant.findAll(
      { where: { userId: req.params.user_id } },
      { include: User }
    )
    res.send(userAndPlants)
  } catch (error) {
    throw error
  }
}

const GetPlantByRoom = async (req, res) => {
  try {
    const roomAndPlants = await Plant.findAll(
      {
        where: { roomId: req.params.room_id }
      },
      { include: Plant }
    )
    res.send(roomAndPlants)
  } catch (error) {
    throw error
  }
}

const CreatePlant = async (req, res) => {
  try {
    const { name, roomId, userId, details, image } = req.body.plantFormValues
    console.log(req.body.plantFormValues)
    let plant = await Plant.create({ name, roomId, userId, details, image })
    res.send(plant)
  } catch (error) {
    throw error
  }
}

const UpdatePlant = async (req, res) => {
  try {
    let plantId = parseInt(req.params.plant_id)
    let updatedPlant = await Plant.update(req.body, {
      where: { id: plantId },
      returning: true
    })
    res.send(updatedPlant)
  } catch (error) {
    throw error
  }
}

const DeletePlant = async (req, res) => {
  try {
    let plantId = parseInt(req.params.plant_id)
    await Plant.destroy({ where: { id: plantId } })
    res.send({ message: `Deleted plant with an id of ${plantId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPlants,
  GetPlantById,
  GetPlantByUser,
  GetPlantByRoom,
  CreatePlant,
  UpdatePlant,
  DeletePlant
}
