import { Sequelize } from "sequelize";
import { config } from "../config/config.js";
import setupModels from "../db/models/index.js";

const USER = encodeURIComponent(config.development.dbUser);
const PASSWORD = encodeURIComponent(config.development.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.development.dbHost}:${config.development.dbPort}/${config.development.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

console.log('- - - - - - - - - - - - - - - - - - - - - -');
console.log(URI);
console.log('- - - - - - - - - - - - - - - - - - - - - -');

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  // dialect: 'mysql',
  logging: true
});

setupModels(sequelize);

export { sequelize }

