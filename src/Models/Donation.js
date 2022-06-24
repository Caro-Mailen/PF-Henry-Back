const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Donation', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    }, {
        timestamps: false
    });
};
