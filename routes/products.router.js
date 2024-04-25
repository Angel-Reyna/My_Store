import express from 'express';
import ProductsService from '../services/product.services.js'

const router = express.Router();
const service = new ProductsService();

//Find Items
router.get('/', async ( req, res ) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.get('/filter', ( req,res ) => {//especifico
  res.send('Yo soy un filter 💅')
}); // para que no choquen dos direcciones/rutas similares
// se debe poner primero todo lo que sea especifico antes de lo que sea dinámico

//Find Item
router.get('/:id', async ( req, res ) => {//dinámico
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(302).json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

//Create Item
router.post('/', async ( req,res ) => {
  const body = req.body;
  const newItem = await service.create(body);
  res.status(201).json({
    message: 'Created',
    data: newItem
  });
});

//Update Item
router.patch('/:id', async ( req,res ) => {
try {
  const { id } = req.params;
  const body = req.body;
  const itemUpdate = await service.update( id, body );
    res.json({
      message: 'Item Updated',
      data: itemUpdate
    });
} catch (error) {
  res.status(404).json({
    message: error.message
  });
}
});

//Delete Item
router.delete('/:id', async ( req,res ) => {
  const { id } = req.params;
  const itemDelete = await service.delete( id );
  res.json({
    message: 'deleted',
    itemDelete
  });
});



export default router;
