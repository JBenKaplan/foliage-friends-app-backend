const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const UserRouter = require('./routes/UserRouter')
const PlantRouter = require('./routes/PlantRouter')
const RoomRouter = require('./routes/RoomRouter')

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ message: 'Server Works' }))

app.use('/users', UserRouter)
app.use('/plants', PlantRouter)
app.use('/rooms', RoomRouter)

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
