const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')

const server = http.createServer(app)
const port = config.port

server.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})