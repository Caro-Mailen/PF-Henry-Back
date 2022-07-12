const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Donation', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}
