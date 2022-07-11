const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Seguimiento', {
    emails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    timestamps: false
  })
}
