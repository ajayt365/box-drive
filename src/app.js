const express = require('express')
require('dotenv').config()
const ev = require('express-validation')
const passport = require('passport')

const app = express()
const morgan = require('morgan')
const userRouter = require('./routes/user')
const sequelize = require('./utils/database')

const port = process.env.PORT || 3001
require('./models/user')
// middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

require('./services/auth.services')
// router middlewares
app.use('/api/v1/user', userRouter)

app.get('/', (req, res) => {
  res.send('testing')
})

app.use((err, req, res, next) => {
  // specific for validation errors
  if (err instanceof ev.ValidationError) return res.status(err.status).json(err)

  // other type of errors, it *might* also be a Runtime Error
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).send(err.stack)
  }
  return res.status(500)
})

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
