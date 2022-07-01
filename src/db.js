require('dotenv').config()
const { Sequelize } = require('sequelize')
const pet = require('./Models/Pet.js')
const user = require('./Models/User.js')
const donation = require('./Models/Donation.js')

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env

const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize({
    database: DB_NAME,
    dialect: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    pool: {
      max: 3,
      min: 1,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      keepAlive: true
    },
    ssl: true
  })
  : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pfmascotas`, {
    logging: false,
    native: false
  })

try {
  pet(sequelize)
  user(sequelize)
  donation(sequelize)
} catch (e) {
  console.log(e.message)
}

const { Pet, User, Donation } = sequelize.models

// relaciones.
User.hasMany(Pet)
Pet.belongsTo(User)

User.hasMany(Donation)
Donation.belongsTo(User)

module.exports = {
  ...sequelize.models,
  db: sequelize
}
