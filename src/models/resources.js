const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const resource = sequelize.define('resource', {
  name: {
    type: Sequelize.STRING,
  },
  owner: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
})

module.exports = {
  resource,
}
