// Cargar las variables de entorno
require('dotenv').config();

// Importar el módulo pg
const pgp = require('pg-promise')();

// Configuración de la conexión
const pool =  pgp({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// Exportar la instancia del pool para ser utilizada en otros módulos
module.exports = pool;