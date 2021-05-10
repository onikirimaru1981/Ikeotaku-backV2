
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const MangaSchema = new Schema({

    id: {
        type: Number,
        key: true
    },
    categoria: {
        type: String,
        default: ''
    },

    volumenes: {
        type: String,
        default: ''
    },

    titulos: {
        en: { type: String },
        en_jp: { type: String },
        ja_jp: { type: String },
        default: ''
    },

    synopsis: {
        type: String,
        default: ''
    },


    capitulos: {
        type: Number,
        default: 0
    },

    rank_Popularidad: {
        type: Number,
        default: 0
    },

    PEGI: {
        type: String,
        default: ''
    },

    edad_Recomendada: {
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

    finalizadoEn: {
        type: String,
        default: ''
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


    estado: {
        type: Boolean,
        default: true
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario'

    }],
});


MangaSchema.plugin(mongoosePaginate);





MangaSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();

    return data;
}


module.exports = model('Manga', MangaSchema);