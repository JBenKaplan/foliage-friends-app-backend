'use strict'
const falso = require('@ngneat/falso')
/** @type {import('sequelize-cli').Migration} */

const users = [...Array(10)].map(() => ({
  name: falso.randFullName(),
  email: falso.randEmail(),
  passwordDigest: falso.randShape(),
  createdAt: new Date(),
  updatedAt: new Date()
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users')
  }
}
