const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



const FavoritoSchema = new Schema({

    favorito: {
        type: String

    },

    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    anime: {

        type: Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    },
    manga: {

        type: Schema.Types.ObjectId,
        ref: 'Manga',
        required: true
    }

});

FavoritoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();

    return data;
};

FavoritoSchema.plugin(mongoosePaginate);


module.exports = model('Favorito', FavoritoSchema);

