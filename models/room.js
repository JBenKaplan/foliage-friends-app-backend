'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Room.hasMany(models.Plant, {
        foreignKey: 'roomId'
      })
    }
  }
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      plantId: {
        // JAL - I do not think this is possible, because a room should have many plants, and this implies that it is related to plants by a single plantId. I am leaving this with the default "allowNull: true" in order to test
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'plants',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Room',
      tableName: 'rooms'
    }
  )
  return Room
}
