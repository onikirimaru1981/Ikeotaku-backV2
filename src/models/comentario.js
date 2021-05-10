// Creando modelo categoria para apoyarse en BD con para mas tarde validarlo
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ComentarioSchema = Schema({
    comentario: {
        type: String,
        required: [true, 'El comentario es ogligatorio'],


    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    creado_por: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario',

    },

    anime: {

        type: Schema.Types.ObjectId,
        ref: 'Anime',

    },
    manga: {

        type: Schema.Types.ObjectId,
        ref: 'Manga',

    },



});

ComentarioSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();

    return data;
};

ComentarioSchema.plugin(mongoosePaginate);



module.exports = model('Comentario', ComentarioSchema);