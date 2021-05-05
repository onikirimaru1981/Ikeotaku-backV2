const { Schema, model } = require('mongoose');


const AnimesSchema = Schema({

    id: {
        type: Number,
        unique: true,
        min: 1
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
    }

}, { versionKey: false });
// AnimesSchema.methods.toJSON = function () {
//     const { __v, ...data } = this.toObject();
//     return data;
// }







module.exports = model('Animes', AnimesSchema);
