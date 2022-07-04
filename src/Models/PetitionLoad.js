const sequelize = require('sequelize')
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('PetitionLoad', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          image: {
            type: DataTypes.TEXT,
            defaultValue: 'https://baltrion.es/wp-content/uploads/sin-IMAGEN.jpg'
          },
          pet: {
            type: DataTypes.ENUM(['dog', 'cat']),
            allowNull: false
          },
          size: {
            type: DataTypes.ENUM(['small', 'medium', 'big']),
            allowNull: false,
            defaultValue: 'medium'
          },
          weight: {
            type: DataTypes.STRING
          },
          fur: {
            type: DataTypes.STRING,
            allowNull: false
          },
          breed: {
            type: DataTypes.STRING,
    
            allowNull: false,
            defaultValue: 'crossbreed'
          },
          gender: {
            type: DataTypes.ENUM(['female', 'male', 'unknown']),
            allowNull: false,
            defaultValue: 'unknown'
          },
    
          castration: {
            type: DataTypes.ENUM(['true', 'false', 'unknown']),
            allowNull: false,
            defaultValue: 'unknown'
          },
          vaccinate: {
            type: DataTypes.ENUM(['true', 'false', 'unknown']),
            allowNull: false,
            defaultValue: 'unknown'
          },
          stateBinary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
          },
          state: {
            type: DataTypes.ENUM(['adopt', 'adopted', 'lost', 'transit']),
            defaultValue: 'adopt',
            allowNull: false
          },
          foundDate: {
            type: DataTypes.STRING
          },
          actualPlace: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
          },
          foundPlace: {
            type: DataTypes.STRING
          },
          formDate: {
            type: DataTypes.DATE,
            allowNull:false
          },
          petId: {
             type: DataTypes.INTEGER,
             allowNull:false
          }
    })
}