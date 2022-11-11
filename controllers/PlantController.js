const { User, Room, Plant } = require('../models')

const GetPlants = async (req, res) => {
  try {
    const plant = await Plant.findAll()
    res.send(plant)
  } catch (error) {
    throw error
  }
}

const GetPlantByUserId = async (req, res) => {
  try {
    const userAndPlants = await Plant.findByPk(req.params.user_id)
    res.send(userAndPlants)
  } catch (error) {
    throw error
  }
}

const GetBooks = async (req, res) => {
  try {
    const book = await Book.findAll()
    res.send(book)
  } catch (error) {
    throw error
  }
}

const CreateBook = async (req, res) => {
  try {
    let bookBody = { ...req.body }
    let book = await Book.create(bookBody)
    res.send(book)
  } catch (error) {
    throw error
  }
}

const UpdateBook = async (req, res) => {
  try {
    let bookId = parseInt(req.params.book_id)
    let updatedBook = await Book.update(req.body, {
      where: { id: bookId },
      returning: true
    })
    res.send(updatedBook)
  } catch (error) {
    throw error
  }
}

const DeleteBook = async (req, res) => {
  try {
    let bookId = parseInt(req.params.book_id)
    await Book.destroy({ where: { id: bookId } })
    res.send({ message: `Deleted book with an id of ${bookId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPlants,
  GetPlantByUserId,
  GetBooks,
  CreateBook,
  UpdateBook,
  DeleteBook
}
