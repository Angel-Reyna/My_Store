import Joi from 'joi'

const id = Joi.number().integer().messages({
  'string.base': '"id" debe ser una identification valida'
})
// const name = Joi.string().min(3).max(25).messages({
//   'string.base': '"nombre" debe ser un tipo de [texto]',
//   'string.empty': '"nombre" no puede ser un campo vacío',
//   'string.min': '"nombre" debe tener una longitud mínima de {#limit}',
//   'string.max': '"nombre" debe tener una longitud máxima de {#limit}'
// })
// const lastName = Joi.string().min(3).max(25).messages({
//   'string.base': '"nombre" debe ser un tipo de [texto]',
//   'string.empty': '"nombre" no puede ser un campo vacío',
//   'string.min': '"nombre" debe tener una longitud mínima de {#limit}',
//   'string.max': '"nombre" debe tener una longitud máxima de {#limit}'
// })
const email = Joi.string().email().messages({
  'string.base': '"nombre" debe ser un tipo de [texto]',
  'string.empty': '"nombre" no puede ser un campo vacío'
})
const password = Joi.string().min(8)

const createUserSchema = Joi.object({
  // name: name.required(),
  // lastName: lastName.required(),
  password: password.required(),
  email: email.required()
})

const updateUserSchema = Joi.object({
  // name: name.optional(),
  // lastName: lastName.optional(),
  password: password.optional(),
  email: email.optional()
})

const getUserSchema = Joi.object({
  id: id.required()
})

export { createUserSchema, updateUserSchema, getUserSchema }
