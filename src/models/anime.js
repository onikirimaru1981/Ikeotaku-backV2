const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AnimeSchema = Schema({
    id: {
        type: Number,
        unique: true,
        min: 1
    },

    titulos: {
        en: { type: String },
        en_jp: { type: String },
        ja_jp: { type: String },

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    synopsis: {
        type: String,
        default: ''
    },
    categoria: {
        type: String,

    },
    numero_Episodios: {
        type: Number,
        default: 0
    },
    duracion_Episodios: {
        type: Number,
        default: 0
    },
    rank_Popularidad: {
        type: Number,
        default: 0
    },
    edad_Recomendada: {
        type: String,
        default: 13
    },
    PEGI: {
        type: String,
        default: ''
    },
    formato: {
        type: String,
        default: ''
    },
    situacion: {
        type: String,
        default: ''
    },
    creadoEn: {
        type: String,
        default: ''
    },
    finalizadoEN: {
        type: String,
        default: ''
    },

    imagenes: {
        diminuta: { type: String },
        mediana: { type: String },
        pequeña: { type: String },
        default: ''
    },
    youtubeVideoId: {
        type: String,
        default: ''
    },
    formato: {
        type: String,
        default: ''
    },
    puntuacion: {
        type: Number,
        default: 0
    },

    estado: {
        type: Boolean,
        default: true
    }
});
AnimeSchema.plugin(mongoosePaginate);

AnimeSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();// Quitando lo que no quiero que se incluya en la data

    return data;
};


module.exports = model('Anime', AnimeSchema);