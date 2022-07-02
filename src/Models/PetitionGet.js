const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('PetitionGet', {
    type: {
      type: DataTypes.ENUM(['adopt', 'transit']),
      allowNull: false
    },
    formDate: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userAge: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tel: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    actualPlace: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    otherPets: {
      type: DataTypes.ENUM(['true', 'false']),
      allowNull: false
    },
    otherPetsCastration: {
      type: DataTypes.ENUM(['true', 'false'])
    },
    otherPetsVacunation: {
      type: DataTypes.ENUM(['true', 'false'])
    },
    otherPetsInfo: {
      type: DataTypes.TEXT
    },
    adoptedPetPlace: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    openSpace: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rental: {
      type: DataTypes.ENUM(['owner', 'tenant']),
      allowNull: false
    },
    adoptedPetSleepingSpace: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    getPetReason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    transitPetPeriod: {
      type: DataTypes.TEXT
    },
    userAgreement: {
      type: DataTypes.ENUM(['true', 'false'])
    },
    userMovility: {
      type: DataTypes.ENUM(['yes', 'no']),
      allowNull: false
    },
    familySize: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    FamilyRelation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    adoptedPetAloneMoments: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    adoptedPetWalkingInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    adaptationTime: {
      type: DataTypes.ENUM(['yes', 'no']),
      allowNull: false
    },
    userMovingIdea: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  })
}
