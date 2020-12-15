const Express = require('express')()
const Cors = require('cors')()
const BodyParser = require('body-parser')

Express.use(Cors)
Express.use(BodyParser.urlencoded({ extended: false }))
Express.use(BodyParser.json())

module.exports = Express