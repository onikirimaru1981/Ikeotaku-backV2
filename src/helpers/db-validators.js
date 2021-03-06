
const mongoose = require('mongoose');
const { Anime, Manga, Role, Usuario } = require('../models');


const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol: ${rol} no esta registrado en la base de datos`)
    };

};


const emailExiste = async (correo = '') => {

    const existeCorreo = await Usuario.findOne({ correo });

    if (existeCorreo) {
        throw new Error(`El correo: ${correo} ya esta registrado,utilice otro diferente`);
    };

};

const existeUsuarioPorId = async (id = '') => {

    if (mongoose.Types.ObjectId.isValid(id)) {

        const usuario = await Usuario.findById(id);
        if (!usuario) {

            throw new Error(`El usuario con id: ${id} no existe en la BD`);
        };


        if (!usuario.estado) {
            throw new Error(`El id  ${id}  no existe en la BD`);
        };

    } else {
        throw new Error(`El id ${id} no es válido`);
    };

};


const existeMangaPorId = async (id = '') => {

    if (id) {

        const manga = await Manga.findOne({ id });
        if (!manga) {

            throw new Error(`El manga con id: ${id} no existe en la BD`);
        };


        if (!manga.estado) {
            throw new Error(`El id: ${id} no existe en la BD`);
        }
    } else {
        throw new Error(`El id ${id} no es válido`);
    };

};


const existeAnimePorId = async (id = '') => {

    if (id) {

        const anime = await Anime.findOne({ id });

        if (!anime) {

            throw new Error(`El anime con id: ${id} no existe en la BD`);
        };

        if (!anime.estado) {
            throw new Error(`El id: ${id} no existe en la BD`);
        };
    } else {
        throw new Error(`El id ${id} no es válido`);
    };

};


const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion: ${coleccion} no esta permitida. Colecciones permitidas: ${colecciones}`);
    };

    return true;
};


module.exports = {
    coleccionesPermitidas,
    emailExiste,
    esRoleValido,
    existeAnimePorId,
    existeMangaPorId,
    existeUsuarioPorId,
};