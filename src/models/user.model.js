// const User= sequelize.define()
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    len: [2, 40],
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    len: [2, 40],
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {},
  },
});

module.exports = User;
