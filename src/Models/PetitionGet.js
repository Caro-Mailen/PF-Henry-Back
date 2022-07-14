const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('PetitionGet', {
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
    otherPetsInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    otherPetsCastration: {
      type: DataTypes.ENUM(['true', 'false']),
      allowNull: true
    },
    otherPetsVacunation: {
      type: DataTypes.ENUM(['true', 'false']),
      allowNull: true
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
    userMovility: {
      type: DataTypes.ENUM(['yes', 'no']),
      allowNull: false
    },
    familySize: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    familyRelation: {
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
      type: DataTypes.ENUM(['yes', 'no', 'maybe']),
      allowNull: false
    },
    state: {
      type: DataTypes.ENUM(['adopt', 'adopted', 'transit']),
      allowNull: false
    },
    transitPetPeriod: {
      type: DataTypes.TEXT
    },
    userAgreement: {
      type: DataTypes.ENUM(['true', 'false'])
    },
    userMovingIdea: {
      type: DataTypes.TEXT
    },
    petId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    formState: {
      type: DataTypes.ENUM(['pending', 'acepted', 'rejected']),
      defaultValue: 'pending'
    }
  }, {
    timestamps: false
  })
}
