require('dotenv').config();
const { Sequelize } = require('sequelize');
const pet = require('./Models/Pet.js')
const user = require('./Models/User.js');
const donation = require('./Models/Donation.js');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pfmascotas`, {
  logging: false,
  native: false,
});

try{
  pet(sequelize);
  user(sequelize);
  donation(sequelize);
} catch (e) {
  console.log(e.message);
}

let {Pet, User, Donation} = sequelize.models;

//relaciones.
User.hasMany(Pet);
Pet.belongsTo(User);

User.hasMany(Donation);
Donation.belongsTo(User);

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
