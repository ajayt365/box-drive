const Sequelize = require('sequelize')
// const passwordRegex = /a-z|A-Z/
const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
const validator = require('validator')
const bcrypt = require('bcrypt')
const sequelize = require('../utils/database')

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: [false, 'is required'],
      trim: true,
      len: [2, 40],
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
      len: [2, 40],
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
      unique: true,
      len: [2, 40],
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        validate(email) {
          return validator.isEmail(email)
        },
        // message:'{VALUE} is not a valid email'
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
      validate: {
        validate(password) {
          return passwordReg.test(password)
        },
      },
    },
  },
  {
    timestamps: true,
  }
)
// hooks

User.hook('beforeSave', async user => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
})
// User instance method

User.prototype.comparePassword = async function(password, next) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (e) {
    return next(e)
  }
}

User.sync()
  .then(() => {
    console.log('Table created')
  })
  .catch(e => {
    console.error(e.message)
  })

module.exports = User
