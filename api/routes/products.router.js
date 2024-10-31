import express from 'express'
import ProductsService from '../services/product.services.js'
import validatorHandler from '../middlewares/validator.handler.js'
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema.js'

const router = express.Router()
const services = new ProductsService()

// Find Products
router.get('/', async (req, res, next) => {
  try {
    const products = await services.find()
    res.json(products)
  } catch (error) {
    next(error)
  }

  // const products = await services.find()
  // res.status(200).json(products)
})

router.get('/filter', (req, res) => { // especifico
  res.send('Yo soy un filter 💅')
}) // para que no choquen dos direcciones/rutas similares
// se debe poner primero todo lo que sea especifico antes de lo que sea dinámico

// Find  Individual Product
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => { // dinámico
    try {
      const { id } = req.params
      const product = await services.findOne(id)
      res.status(302).json(product)
    } catch (error) {
      next(error)
    }
  }
)

// Create Product
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newItem = await services.create(body)
      console.log('🙌 Si llego ', newItem)
      res.status(201).json({
        message: 'Created',
        data: newItem
      })
    } catch (error) {
      next(error) // Pass errors to Express.
    }
  }
)

// Update Product
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const itemUpdate = await services.update(id, body)
      res.json({
        message: 'Item Updated',
        data: itemUpdate
      })
    } catch (error) {
      next(error)
    }
  }
)

// Delete Product
router.delete('/:id',
  async (req, res) => {
    const { id } = req.params
    const itemDelete = await services.delete(id)
    res.json({
      message: 'deleted',
      itemDelete
    })
  })

export default router
