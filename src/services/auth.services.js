const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')
// console.log(LocalStrategy) //[Circular]
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, next) => {
      try {
        const user = await User.findOne({
          where: { email },
        })
        if (!user) {
          return next(null, false, { message: 'Incorrect email.' })
        }

        if (user.comparePassword(password)) {
          return next(null, user)
        }

        return next(null, false, { message: 'Incorrect password.' })
      } catch (err) {
        return next(err)
      }
    }
  )
)

// jwt configuration
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() // "bearer JWT"
opts.secretOrKey = process.env.SECRET_KEY

passport.use(
  new JWTStrategy(opts, async (token, done) => {
    try {
      const user = await User.findOne({
        where: {
          id: token.id,
        },
      })
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  })
)

const authJWT = passport.authenticate('jwt', { session: false })
const authLocal = passport.authenticate('local', { session: false })
module.exports = {
  authLocal,
  authJWT,
}
