const config = require('./utils/config')
const logger = require('./utils/logger')
require('express-async-errors')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const app = express()
const blogRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')

const mongoose = require('mongoose')

const { send } = require('process')

const mongoUrl = config.mongoUrl

mongoose.connect(mongoUrl)
.then(result => {
  logger.info('Connected to MongoDB!')
})
.catch(result => {
  logger.error('Connection to MongoDb failed')
})

app.use(express.json())
app.use(middleware.requestLogger)

app.use(cors())
app.use(middleware.tokenGetter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const testingRouter = require('./controller/test/testRouter')
app.use('/api/test', testingRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app