import express from 'express'
import productsRouter from './products.router.js'
import usersRouter from './users.router.js'
import categoriesRouter from './categories.router.js'
import orderRouter from './orders.router.js'
import customersRouter from './customers.router.js'

function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
  router.use('/customers', customersRouter)
  router.use('/orders', orderRouter)

  // app.use('/api/v2', router);
  // router.use('/products', productsRouter);
  // router.use('/users', usersRouter);
  // router.use('/categories', categoriesRouter);
}

export default routerApi
