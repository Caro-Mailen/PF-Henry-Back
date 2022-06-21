const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('donation', {
    monto: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM(["USD", "ARS", "BO", "BS", "CO"]),
        allowNull: false,
    }
    });
};
