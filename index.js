import express from 'express';
import routerApi from './routes/index.js';
import { errorsLog,errorHandler,boomErrorHandler } from './middlewares/error.handler.js'
//npm run dev

const app = express();
const port = 3005;

app.use(express.json());

app.get('/', ( req, res ) => {
  res.send(`Hola, 🤟
  soy la ruta por defecto 🍉,
  de un server creado en express 💻`);
});

app.get('/', ( req, res ) => {
  res.send(`Hola, 👋
  yo soy una ruta diferente 🍎`);
});

app.listen(port, () => {
  console.log(`Mi port: http://localhost:${port}`);
});

routerApi(app);

app.use(errorsLog);
app.use(boomErrorHandler);
app.use(errorHandler);
