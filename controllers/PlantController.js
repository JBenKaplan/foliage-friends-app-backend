const { User, Room, Plant } = require('../models')

const GetAllPlants = async (req, res) => {
  try {
    const plants = await Plant.findAll()
    res.send(plants)
  } catch (error) {
    throw error
  }
}

const GetPlantById = async (req, res) => {
  try {
    console.log('API get plant by id')
    let plantId = parseInt(req.params.plant_id)
    let plant = await Plant.findOne({
      where: { id: plantId },
      include: [User, Room]
    })
    res.send(plant)
  } catch (error) {
    throw error
  }
}

const GetAllPlantsByRoom = async (req, res) => {
  try {
    let roomId = parseInt(req.params.room_id)
    const plantsByRoom = await Plant.findAll({
      where: { roomId },
      include: [User, Room]
    })
    res.send(plantsByRoom)
  } catch (error) {
    throw error
  }
}

const GetAllPlantsByUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    const plantsByUser = await Plant.findAll({
      where: { userId },
      include: [User, Room]
    })
    res.send(plantsByUser)
  } catch (error) {
    throw error
  }
}

const CreatePlant = async (req, res) => {
  try {
    const { name, roomId, userId, details, image } = req.body.plantFormValues
    // console.log(req.body.plantFormValues)
    let plant = await Plant.create({ name, roomId, userId, details, image })
    res.send(plant)
  } catch (error) {
    throw error
  }
}

// JAL - This is NOT ready
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
  GetAllPlants,
  GetPlantById,
  GetAllPlantsByRoom,
  GetAllPlantsByUser,
  CreatePlant,
  UpdatePlant,
  DeletePlant
}
