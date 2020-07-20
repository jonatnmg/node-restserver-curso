const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

//Verificar token
let verificarToken = (req, res, next) => {
    //el token viene en el header
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario; //dentro payload viene el objeto usuario
        next();
    });

};


let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
}

module.exports = {
    verificarToken,
    verificaAdmin_Role
}