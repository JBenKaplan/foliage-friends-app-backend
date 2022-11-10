'use strict'
const { User, sequelize } = require('../models')
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rooms = await Promise.all(
      [...Array(10)].map(async () => {
        let user = await User.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          name: falso.randCardinalDirection(),
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )

    await queryInterface.bulkInsert('rooms', rooms)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms')
  }
}
