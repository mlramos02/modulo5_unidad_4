const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/novedades', {
        layout: 'admin/layout',
        nombre: req.session.nombre
    });
});

module.exports = router;
