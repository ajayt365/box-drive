const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function signup(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (e) {
    res.status(501).json({ e: e.message })
  }
}

async function login(req, res) {
  const { id, email } = req.user
  const token = jwt.sign(
    {
      id,
      email,
    },
    process.env.SECRET_KEY,
    { expiresIn: '2h' }
  )
  const newObj = {
    id,
    email,
    token: `bearer ${token}`,
  }
  res.status(200).json(newObj)
}

module.exports = {
  signup,
  login,
}
