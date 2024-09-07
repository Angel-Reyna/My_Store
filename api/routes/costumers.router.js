import express from 'express'
import CostumersService from '../services/costumers.services.js'
import validatorHandler from '../middlewares/validator.handler.js'
import { createCostumerSchema, updateCostumerSchema, getCostumerSchema } from '../schemas/costumer.schema.js'

const router = express.Router()
const services = new CostumersService()

//  Find Costumer
router.get('/', async (req, res, next) => {
  try {
    const costumers = await services.find()
    res.json(costumers)
  } catch (error) {
    next(error)
  }
})

//  Find Individual Costumer
router.get('/:id',
  validatorHandler(getCostumerSchema, Number('params')),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const costumer = await services.findOne(id)
      res.status(302).json(costumer)
    } catch (error) {
      next(error)
    }
  }
)

//  Create Costumer
router.post('/',
  validatorHandler(createCostumerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCostumer = await services.create(body)
      res.status(201).json(newCostumer)
    } catch (error) {
      next(error) // Pass errors to Express.
    }
  }
)

//  Update Costumer
router.patch('/:id',
  validatorHandler(getCostumerSchema, Number('params')),
  validatorHandler(updateCostumerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const costumerUpdate = await services.update(id, body)
      res.json({
        message: 'Costumers Updated',
        data: costumerUpdate
      })
    } catch (error) {
      next(error)
    }
  }
)

//  Delete Costumer
router.delete('/:id',
  async (req, res) => {
    const { id } = req.params
    const response = await services.delete(id)
    res.json({
      message: 'Costumer Deleted',
      response
    })
  })

export default router
