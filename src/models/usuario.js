
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [this.google == false,],
        required: ['La contraseña es requerida.']
    },

    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },

    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        // default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE',]

    },
    favorito: {

        type: Schema.Types.ObjectId,
        ref: 'Favorito'
    },
    comentario: {
        type: Schema.Types.ObjectId,
        ref: 'Comentario'
    },
    puntuacion: {
        type: Schema.Types.ObjectId,
        ref: 'Puntuacion'
    },

    ciudad: {
        type: String,
        default: null
    },

    genero: {
        type: String,
        default: null
    },

    pais: {
        type: String,
        default: null
    },

    img: {
        type: String,
        default: null
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

});
UsuarioSchema.plugin(mongoosePaginate);



UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);