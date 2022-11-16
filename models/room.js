'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Room.hasMany(models.Plant, {
        foreignKey: 'roomId',
        onDelete: 'CASCADE',
        hooks: true
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
