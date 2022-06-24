const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Breed', {
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
    }, {
        timestamps: false
    });
};
