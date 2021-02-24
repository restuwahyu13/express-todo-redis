require('dotenv/config')
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const todoRoute = require('./route')

const app = express()
const server = http.createServer(app)

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	poolSize: 10,
	socketTimeoutMS: 60000,
	connectTimeoutMS: 30000,
	loggerLevel: 'error'
})
mongoose.connection.on('connected', () => console.log('database connected'))
mongoose.connection.on('error', () => console.log('database not connected'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(todoRoute)

server.listen(process.env.PORT, () => console.log(`server is running on ${server.address().port}`))
