const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
    });
};
