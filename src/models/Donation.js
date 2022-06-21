const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('donation', {
    monto: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
    });
};
