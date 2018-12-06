const Joi = require('joi')

const schema = Joi.object().keys({
  firstname: Joi.string()
    .min(2)
    .max(30)
    .required(),
  lastname: Joi.string()
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  password: Joi.string()
    .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
    .required(),
  //
})

const userValidation = {
  body: schema,
}
// console.log(userValidation)
module.exports = {
  userValidation,
}
