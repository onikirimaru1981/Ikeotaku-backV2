const { Schema, model } = require('mongoose');


const GeneroSchema = Schema({

    tipo: {
        type: String
    },

    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }

}, { versionKey: false });




module.exports = model('Genero', GeneroSchema);
