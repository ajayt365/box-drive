const User = require('../models/user.model');

async function createUser(req, res) {
  const user = await User.create(req.body);
  res.status(201).json(user);
}

module.exports = {
  createUser,
};
