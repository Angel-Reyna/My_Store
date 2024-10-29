import express from 'express'
import UsersService from '../services/users.services.js'
import validatorHandler from '../middlewares/validator.handler.js'
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas/user.schema.js'

const router = express.Router()
const services = new UsersService()

// Find Users
router.get('/', async (req, res, next) => {
  try {
    const users = await services.find()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// Find Individual User
router.get('/:id',
  validatorHandler(getUserSchema, Number('params')),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await services.findOne(id)
      res.status(302).json(user)
    } catch (error) {
      next(error)
    }
  }
)

// Create User
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await services.create(body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error) // Pass errors to Express.
    }
  }
)

// Update User
router.patch('/:id',
  validatorHandler(getUserSchema, Number('params')),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const userUpdate = await services.update(id, body)
      res.json({
        message: 'User Updated',
        data: userUpdate
      })
    } catch (error) {
      next(error)
    }
  }
)

// Delete User
router.delete('/:id',
  async (req, res) => {
    const { id } = req.params
    const response = await services.delete(id)
    res.json({
      message: 'User Deleted',
      response
    })
  })

// //parámetros query
// router.get('/', ( req, res ) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   }else {
//     res.send('No hay parámetros');
//   }
// });

export default router
