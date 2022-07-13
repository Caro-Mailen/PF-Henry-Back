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
        defaultValue: 'https://p16-va-default.akamaized.net/img/musically-maliva-obj/1665282759496710~c5_720x720.jpeg'
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
