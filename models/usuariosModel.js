const db = require('../db');
const bcrypt = require('bcrypt');

async function getUserByUsernameAndPassword(usuario, password) {
    try {
        const user = await db.oneOrNone('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { getUserByUsernameAndPassword };
