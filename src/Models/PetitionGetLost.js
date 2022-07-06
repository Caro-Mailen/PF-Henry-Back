const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('PetitionGetLost', {
        getReason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lostZone:{
            type: DataTypes.TEXT
        },
        originalName:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tel: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userMovility: {
            type: DataTypes.ENUM(['yes', 'no']),
            allowNull:false
        },
        petId: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        formDate: {
            type: DataTypes.TEXT,
            allowNull:false
          },
    })
}