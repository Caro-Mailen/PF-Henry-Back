const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
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
        type: DataTypes.STRING

      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: 'https://i.postimg.cc/0QD2ssQd/Whats-App-Image-2022-07-07-at-3-44-31-PM-1.jpg'
      },
      rol: {
        type: DataTypes.ENUM(['admin', 'user']),
        defaultValue: 'user'
      },
      rating: {
        type: DataTypes.ENUM(['null', '1', '2', '3', '4', '5']),
        defaultValue: 'null'
      }
    },
    {
      timestamps: false
    }
  )
}
