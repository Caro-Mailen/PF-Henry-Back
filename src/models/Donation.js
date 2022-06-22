const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Donation', {
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM(["USD", "ARS", "BO", "BS", "CO"]),
        allowNull: false,
    }
    });
};
