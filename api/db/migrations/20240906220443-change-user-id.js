'use strict'
const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */

const { COSTUMER_TABLE } = require('../models/costumer.model.js')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(COSTUMER_TABLE, 'user-id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    })
  },
  down: async (queryInterface) => {
    // await queryInterface.dropTable(COSTUMER_TABLE)
  }
}
