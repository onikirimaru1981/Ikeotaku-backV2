
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MangaSchema = new Schema({

    titulo: {
        en: {
            type: String,
            required: [true, 'El title es ogligatorio']
        },
        en_jp: { type: String },
        default: ''
    },

    categoria: {
        type: String, required: [true, 'El tipo es ogligatorio']
    },

    imagen: {
        diminuta: { type: String },
        mediana: { type: String }
    },

    estado: {
        type: Boolean,
        default: true,
    },

    synopsis: {
        type: String,
        required: [true, 'La sinopsis es ogligatoria']
    },

    favoritesCount: {
        type: Number,
        required: [true, 'El title es ogligatorio']
    },

    ageRating: {
        type: String,
        required: [true, 'El title es ogligatorio']
    },

    ageRatingGuide: {
        type: String,
        required: [true, 'El title es ogligatorio']
    },

    status: {
        type: String,
        required: [true, 'El title es ogligatorio']
    },

    chapterCount: {
        type: Number,
        required: [true, 'El title es ogligatorio']
    },

    volumeCount: {
        type: Number,
        required: [true, 'El title es ogligatorio']
    },

    serialization: {
        type: String,
        required: [true, 'El title es ogligatorio']
    },

    mangaType: {
        type: String,
        required: [true, 'El title es ogligatorio']
    },

    puntuacion: {
        type: Schema.Types.ObjectId,
        ref: 'Puntuacion',
        required: true
    },


    comentario: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
});


MangaSchema.plugin(mongoosePaginate);



MangaSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();

    return data;
}


module.exports = model('Manga', MangaSchema);