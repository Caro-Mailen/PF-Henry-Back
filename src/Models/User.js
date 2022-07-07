const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      googleId: {
        type: DataTypes.STRING
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      rol: {
        type: DataTypes.ENUM(['admin', 'user']),
        defaultValue: 'user'
      }
    },
    {
      timestamps: false
    }
  )
}
