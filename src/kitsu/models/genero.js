require("dotenv").config();
const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.SERVER);

autoIncrement.initialize(connection);

const GeneroSchema = Schema({
    id: {
        type: Number
    },

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

GeneroSchema.plugin(autoIncrement.plugin, { model: 'Genero', field: 'id', startAt: 1, });




module.exports = model('Genero', GeneroSchema);
