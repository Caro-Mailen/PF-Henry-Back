require('dotenv').config();
const { Sequelize } = require('sequelize');
const Pet = require('./models/Pet.js')
const User = require('./models/User.js')

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pfmascotas`, {
  logging: false,
  native: false,
});

try{
  Pet(sequelize);
  User(sequelize);
} catch (e) {
  console.log(e.message);
}

let {pet, user, donation} = sequelize.models;

//relaciones.

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
