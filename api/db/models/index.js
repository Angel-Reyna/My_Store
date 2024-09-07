const { User, UserSchema } = require('./user.model.js')
const { Costumer, CostumerSchema } = require('./costumer.model.js')

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Costumer.init(CostumerSchema, Costumer.config(sequelize))

  User.associate(sequelize.models)
  Costumer.associate(sequelize.models)
}

module.exports = setupModels
