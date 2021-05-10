require("dotenv").config();
const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.SERVER);

autoIncrement.initialize(connection);



const AnimeSchema = Schema({

    id: {
        type: Number
    },
    titulos: {
        en: { type: String },
        en_jp: { type: String },
        ja_jp: { type: String }
    },
    synopsis: {
        type: String
    },
    categoria: {
        type: String
    },
    numero_Episodios: {
        type: Number
    },
    duracion_Episodios: {
        type: Number
    },
    rank_Popularidad: {
        type: Number
    },
    edad_Recomendada: {
        type: String
    },
    PEGI: {
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
    finalizadoEN: {
        type: String
    },

    imagenes: {
        diminuta: { type: String },
        mediana: { type: String },
        pequeña: { type: String }
    },
    youtubeVideoId: {
        type: String
    },
    formato: {
        type: String
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

AnimeSchema.plugin(autoIncrement.plugin, { model: 'Anime', field: 'id', startAt: 1, });




module.exports = model('Anime', AnimeSchema);
