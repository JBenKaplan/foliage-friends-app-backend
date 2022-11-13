'use strict'
const falso = require('@ngneat/falso')
const middleware = require('../middleware')

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await Promise.all(
      [...Array(10)].map(async () => {
        let password = falso.randShape()
        let passwordDigest = await middleware.hashPassword(password)
        return {
          name: `seeder: pw: ${password}`,
          email: falso.randEmail(),
          passwordDigest,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    await queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users')
  }
}
