const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('PetitionGetLost', {
        getReason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lostZone:{
            type: DataTypes.STRING
        },
        originalName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userMovility: {
            type: DataTypes.ENUM(['yes', 'no']),
            allowNull:false
        }
    })
}