const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosModel');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('admin/login', { layout: 'admin/layout' });
});

router.post('/', async (req, res, next) => {
    try {
        const usuario = req.body.usuario;
        const password = req.body.password;
        const user = await usuariosModel.getUserByUsernameAndPassword(usuario, password);
        if (user) {
            req.session.id_usuario = user.id;
            req.session.nombre = user.usuario;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;
