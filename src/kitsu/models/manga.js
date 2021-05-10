require("dotenv").config();
const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.SERVER);

autoIncrement.initialize(connection);



const MangaSchema = new Schema({

    id: {
        type: Number,

    },
    categoria: {
        type: String
    },

    volumenes: {
        type: String
    },

    titulos: {
        en: { type: String },
        en_jp: { type: String },
        ja_jp: { type: String }
    },

    synopsis: {
        type: String
    },


    capitulos: {
        type: Number
    },

    rank_Popularidad: {
        type: Number
    },

    PEGI: {
        type: String
    },

    edad_Recomendada: {
        type: String
    },

    formato: {
        type: String
    },

    situacion: {
        type: String
    },

    creadoEn: {
        type: String
    },

    finalizadoEn: {
        type: String
    },

    imagenes: {
        diminuta: { type: String },
        mediana: { type: String },
        pequena: { type: String }
    },

    puntuacion: {
        type: Number,
        default: 0
    },

    versionKey: {
        type: Number,

    },

    estado: {
        type: Boolean,
        default: true
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario'

    }],
}, { versionKey: false });

MangaSchema.plugin(autoIncrement.plugin, { model: 'Manga', field: 'id', startAt: 1, });



module.exports = model('Manga', MangaSchema);