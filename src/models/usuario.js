
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// const autopopulate = require('mongoose-autopopulate')


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
        emun: ['ADMIN_ROLE', 'USER_ROLE',],
        default: 'USER_ROLE'

    },
    animesFavoritos: [{
        type: String
    }],
    mangasFavoritos: [{
        type: String
    }],

    ciudad: {
        type: String,
        default: ''

    },

    genero: {
        type: String,
        default: 'Desconocido'
    },

    pais: {
        type: String,
        default: ''

    },

    img: {
        type: String,
        default: ''

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
// UsuarioSchema.plugin(autopopulate);



UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);