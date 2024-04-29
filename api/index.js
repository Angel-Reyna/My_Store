import express from 'express';
import routerApi from './routes/index.js';
import { errorsLog,errorHandler,boomErrorHandler } from './middlewares/error.handler.js'
import  cors from "cors";
//npm run dev

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

//localhost:3005/api/v1/products
const whitelist = ['http://localhost:3005', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('dirección de acceso no permitida'));
    }
  }
}

app.get('/api', ( req, res ) => {
  res.send(`Hola, 🤟
  soy la ruta por defecto 🍉,
  de un server creado en express 💻`);
});

app.get('/api/nueva-ruta', ( req, res ) => {
  res.send(`Hola, 👋
  yo soy una ruta diferente 🍎`);
});

app.listen(port, () => {
  console.log(`Mi port: http://localhost:${port}/api`);
});

routerApi(app);

app.use(cors(options));

app.use(errorsLog);
app.use(boomErrorHandler);
app.use(errorHandler);
