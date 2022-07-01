const express = require('express')
const morgan = require('morgan')
const routes = require('./Routes/index.js')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
require('./db.js')
require('./Auth/passportGoogle.js');
const server = express()
server.use(express.json())
server.name = 'API'
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use(cookieSession({name:'session', keys:['lama'],maxAge:24*60*60*100}))
server.use(passport.initialize())
server.use(passport.session())
server.use(cors())
server.use(morgan('dev'))
// server.use(session({secret:'cats'}))
server.use(passport.initialize())
server.use(passport.session())



server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server
