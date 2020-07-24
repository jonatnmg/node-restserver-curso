const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'usuario',
    }
});

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })
module.exports = mongoose.model('Categoria', categoriaSchema);