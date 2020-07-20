const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

//Obtener
app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({estado: true}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });
        })
});

//Crear nuevo registro
app.post('/usuario', (req, res) => {
    let body = req.body;

    //Usamos la clase (esquema mongoose)
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

//Modificar un registro
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })
});

app.get('/usuario', (req, res) => {
    res.json('get Usuario Local');
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    /*
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            }); 
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
    */


    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado , { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            }); 
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    })

});

module.exports = app;