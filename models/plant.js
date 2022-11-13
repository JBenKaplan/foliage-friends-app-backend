'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    static associate(models) {
      Plant.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Plant.belongsTo(models.Room, {
        foreignKey: 'roomId'
      })
    }
  }
  Plant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: DataTypes.STRING,
      image: DataTypes.STRING,
      details: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'rooms',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Plant',
      tableName: 'plants'
    }
  )
  return Plant
}
