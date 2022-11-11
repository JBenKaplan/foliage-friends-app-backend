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
  GetUsers,
  GetUserPlants,
  GetBooks,
  CreateBook,
  UpdateBook,
  DeleteBook
}
