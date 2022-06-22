const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Pet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://baltrion.es/wp-content/uploads/sin-IMAGEN.jpg",
      },
      size: {
        type: DataTypes.ENUM(["small", "medium", "big"]),
        allowNull: false,
        defaultValue: "medium",
      },
      weight: {
        type: DataTypes.STRING,
      },
      fur: {
        type: DataTypes.STRING,
        // type: DataTypes.ENUM(["short", "long"]),
        allowNull: false,
        // defaultValue: "medium",
      },
      breed: {
        // type: DataTypes.ENUM(["crossbreed", "salchicha", "bulldog"]),
        type: DataTypes.STRING,

        allowNull: false,
        defaultValue: "crossbreed",
      },
      gender: {
        type: DataTypes.ENUM(["female", "male"]),
        allowNull: false,
      },
      castration: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      vaccinate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};