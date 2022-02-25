require('dotenv').config()

let mongoUrl = process.env.NODE_ENV === 'test'
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI

let port = process.env.PORT

console.log(mongoUrl)
console.log(port)

module.exports = {
 mongoUrl, 
 port
}