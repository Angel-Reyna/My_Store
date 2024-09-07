'use strict'

/** @type {import('sequelize-cli').Migration} */

const { CostumerSchema, COSTUMER_TABLE } = require('../models/costumer.model.js')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(COSTUMER_TABLE, CostumerSchema)
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(COSTUMER_TABLE)
  }
}
