const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false
    },
    adress:{
        type: DataTypes.STRING,
        allowNull: false
    },
    socialMedia:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tel:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
    });
};
