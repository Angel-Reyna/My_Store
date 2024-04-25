import express from 'express';
import UsersService from '../services/users.services.js'

const router = express.Router();
const services = new UsersService();

//Find Users
router.get('/', ( req, res ) => {
    const users = services.find();
    res.status(200).send(users);
});

//Find User
router.get('/:id', ( req, res ) => {
  const { id } = req.params;
  const user = services.findOne(id);
  if (user === undefined){
    res.status(404).json('404 Not Found');
  }else {
    res.status(302).json(user);
  }
});

//Create User
router.post('/', ( req, res ) => {
  const body = req.body;
  const newUser = services.create(body);
  res.status(201).json({
    message: 'User Created',
    newUser
  });
});

//Delete User
router.delete('/:id', ( req, res ) => {
    const { id } = req.params;
    const response = services.delete(id);
    res.json({
      message: 'User Deleted',
      response
    });
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
