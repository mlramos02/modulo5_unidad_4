const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // En producción, debe ser true si se usa HTTPS
}));

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const secured = (req, res, next) => {
    if (req.session.id_usuario) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

const loginRouter = require('./routes/admin/login');
const novedadesRouter = require('./routes/admin/novedades');

app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, novedadesRouter);

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
