const express = require('express');
const app = express();

//Todas las rutas de la aplicación
app.use(require('./usuario'));
app.use(require('./login'));


module.exports = app;