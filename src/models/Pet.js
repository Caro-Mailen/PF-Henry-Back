const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
