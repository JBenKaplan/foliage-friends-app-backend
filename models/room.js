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
      name: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      plantId: {
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
