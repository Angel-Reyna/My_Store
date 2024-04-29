import Joi from 'joi'

const id = Joi.string().uuid().messages({
  'string.base': `"id" debe ser una identification valida`
});
const name = Joi.string().min(3).max(25).messages({
  'string.base': `"nombre" debe ser un tipo de 'texto'`,
  'string.empty': `"nombre" no puede ser un campo vacío`,
  'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
  'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
});
const price = Joi.number().integer().min(10).messages({
  'number.base': `"precio" debe ser un tipo 'numero'`,
  'number.empty': `"precio" no puede ser un campo vació`,
  'number.min': `"precio" debe tener un valor mínimo de {#limit}`
});
const image = Joi.string().uri().messages({
  'string.base': `"imagen" debe ser un tipo 'url'`,
  'string.empty': `"imagen" no puede ser un campo vació`
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name.optional(),
  price: price.optional(),
  image: image.optional()
});

const getProductSchema = Joi.object({
  id: id.required()
});

export { createProductSchema, updateProductSchema, getProductSchema }
