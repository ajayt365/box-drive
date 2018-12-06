const userRouter = require('express').Router()
const ev = require('express-validation')
const { userValidation } = require('../services/validations')
const userController = require('../controllers/user')
const auth = require('../services/auth.services')

userRouter.post('/signup', ev(userValidation), userController.signup)

userRouter.post('/login', auth.authLocal, userController.login)

userRouter.get('/jwt', auth.authJWT, (req, res) => {
  res.send('protected route')
})

module.exports = userRouter
