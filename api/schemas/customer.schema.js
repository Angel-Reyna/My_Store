import Joi from 'joi'

const id = Joi.number().integer().messages({
  'string.base': '"id" debe ser una identification valida'
})
const name = Joi.string().min(3).max(25).messages({
  'string.base': '"nombre" debe ser un tipo de "texto"',
  'string.empty': '"nombre" no puede ser un campo vacío',
  'string.min': '"nombre" debe tener una longitud mínima de {#limit}',
  'string.max': '"nombre" debe tener una longitud máxima de {#limit}'
})
const lastName = Joi.string().min(3).max(25).messages({
  'string.base': '"apellido" debe ser un tipo de "texto"',
  'string.empty': '"apellido" no puede ser un campo vacío',
  'string.min': '"apellido" debe tener una longitud mínima de {#limit}',
  'string.max': '"apellido" debe tener una longitud máxima de {#limit}'
})
const phone = Joi.string().min(6).max(10).messages({
  'string.base': '"teléfono" debe ser un tipo de "texto"',
  'string.empty': '"teléfono" no puede ser un campo vacío',
  'string.min': '"teléfono" debe tener una longitud mínima de {#limit}',
  'string.max': '"teléfono" debe tener una longitud máxima de {#limit}'
})
const userId = Joi.number().integer().messages({
  'string.base': '"userId" debe ser un tipo de "texto"',
  'string.empty': '"userId" no puede ser un campo vacío'
})
const email = Joi.string().email().messages({
  'string.base': '"email" debe ser un tipo de "texto"',
  'string.empty': '"email" no puede ser un campo vacío'
})
const password = Joi.string()

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
})

const updateCustomerSchema = Joi.object({
  name: name.optional(),
  lastName: lastName.optional(),
  phone: phone.optional(),
  userId: userId.optional()
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

export { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
