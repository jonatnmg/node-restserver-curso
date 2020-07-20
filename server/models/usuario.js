const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}
let usuarioSechema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true,
        require: [true, 'El estado es obligatorio']
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSechema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
usuarioSechema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })
module.exports = mongoose.model('usuario', usuarioSechema);