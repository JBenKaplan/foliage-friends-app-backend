'use strict'
const { Room, User, sequelize } = require('../models')
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const plants = await Promise.all(
      [...Array(100)].map(async () => {
        let user = await User.findOne({
          order: sequelize.random(),
          raw: true
        })
        let room = await Room.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          name: falso.randCardinalDirection(),
          userId: user.id,
          roomId: room.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )

    await queryInterface.bulkInsert('plants', plants)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plants')
  }
}
