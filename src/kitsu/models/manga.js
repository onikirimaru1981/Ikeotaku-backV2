const { Schema, model } = require('mongoose');



const MangaSchema = new Schema({

    id: {
        type: Number,
        unique: true,
        min: 1
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
    }
}, { versionKey: false });



module.exports = model('Mangas', MangaSchema);