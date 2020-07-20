require('./config/config'); //Configuración variables globales o de entorno
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//importar las rutas
app.use(require('./routes/index'));

// parse application/json
app.use(bodyParser.json())

/*
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if( err)
        throw new err;
    else
    console.log('Base de datos online');
});*/
try {
    mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (err)
            throw new err;
        else
            console.log('Base de datos online');
    }); 
} catch (error) {
    throw new error;
}

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: ${process.env.PORT}`)
})