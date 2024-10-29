import express from 'express'
import CustomersService from '../services/customers.services.js'
import validatorHandler from '../middlewares/validator.handler.js'
import { createCustomerSchema, updateCustomerSchema, getCustomerSchema } from '../schemas/customer.schema.js'

const router = express.Router()
const services = new CustomersService()

//  Find Customer
router.get('/', async (req, res, next) => {
  try {
    const customers = await services.find()
    res.json(customers)
  } catch (error) {
    next(error)
  }
})

//  Find Individual Customer
router.get('/:id',
  validatorHandler(getCustomerSchema, Number('params')),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const customer = await services.findOne(id)
      res.status(302).json(customer)
    } catch (error) {
      next(error)
    }
  }
)

//  Create Customer
router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCustomer = await services.create(body)
      res.status(201).json(newCustomer)
    } catch (error) {
      next(error) // Pass errors to Express.
    }
  }
)

//  Update Customer
router.patch('/:id',
  validatorHandler(getCustomerSchema, Number('params')),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const customerUpdate = await services.update(id, body)
      res.json({
        message: 'Customers Updated',
        data: customerUpdate
      })
    } catch (error) {
      next(error)
    }
  }
)

//  Delete Customer
router.delete('/:id',
  async (req, res) => {
    const { id } = req.params
    const response = await services.delete(id)
    res.json({
      message: 'Customer Deleted',
      response
    })
  })

export default router
