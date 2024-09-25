'use strict'
const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */

const { CUSTOMER_TABLE } = require('../models/customer.model.js')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user-id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    })
  },
  down: async (queryInterface) => {
    // await queryInterface.dropTable(CUSTOMER_TABLE)
  }
}
