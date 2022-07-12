const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Tracking', {
    image:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    description: {
      type: DataTypes.TEXT
    },
    date:{
      type: DataTypes.TEXT
    },
    email:{
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  })
}
