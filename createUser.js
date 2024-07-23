require('dotenv').config();
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');

const db = pgp({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD
});

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await db.none('INSERT INTO usuarios (usuario, password) VALUES ($1, $2)', [username, hashedPassword]);
        console.log('Usuario creado con éxito');
    } catch (error) {
        console.error('Error al crear usuario:', error);
    } finally {
        pgp.end(); // Cierra la conexión a la base de datos
    }
}

createUser('admin', 'adminpassword');