const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model.js')

const COSTUMER_TABLE = 'costumers' // nombre de la tabla

const CostumerSchema = {
  // El esquema define la estructura de la BD.
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name' // nombre en db
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    //* nombre en JS
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', //* nombre en PostgreSQL
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Costumer extends Model {
  static associate (models) {
    this.belongsTo(models.User, { as: 'user' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: COSTUMER_TABLE,
      modelName: 'Costumer',
      timestamps: false
    }
  }
}

module.exports = { COSTUMER_TABLE, CostumerSchema, Costumer }
