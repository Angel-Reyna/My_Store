import Joi from 'joi'

const id = Joi.number().integer().messages({
  'string.base': '"id" debe ser una identification valida'
})
const email = Joi.string().email().messages({
  'string.base': '"email" debe ser un tipo de "texto"',
  'string.empty': '"email" no puede ser un campo vacío'
})
const password = Joi.string().min(8)
const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  password: password.required(),
  email: email.required(),
  role: role.required()
})

const updateUserSchema = Joi.object({
  password: password.optional(),
  email: email.optional(),
  role: role.optional()
})

const getUserSchema = Joi.object({
  id: id.required()
})

export { createUserSchema, updateUserSchema, getUserSchema }
