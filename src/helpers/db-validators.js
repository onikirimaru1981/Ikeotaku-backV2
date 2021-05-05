// Centrando el validador de role
const mongoose = require('mongoose');
const { Anime, Usuario, Role, Manga, Favorito } = require('../models');
const { response, request } = require('express');



const esRoleValido = async (rol = '') => {
    console.log(rol);

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol: ${rol} no esta registrado en la base de datos`)
    };

};



const emailExiste = async (correo = '') => {

    const existeCorreo = await Usuario.findOne({ correo });

    if (existeCorreo) {
        throw new Error(`El correo: ${correo} ya esta registrado,utilice otro diferente`)
    };

};


const existeUsuarioPorId = async (id = '') => {

    if (mongoose.Types.ObjectId.isValid(id)) {

        const { estado } = await Usuario.findById(id);

        if (!estado) {
            throw new Error(`El id  ${id}  no existe en la BD`);
        }
    } else {
        throw new Error(`El id ${id} no es válido`);
    };

};





const existeMangaPorId = async (id = '') => {

    if (mongoose.Types.ObjectId.isValid(id)) {

        const { estado } = await Manga.findById(id);

        if (!estado) {
            throw new Error(`El id: ${id} no existe en la BD`);
        }
    } else {
        throw new Error(`El id ${id} no es válido`);
    };




};


const existeAnimePorId = async (id = '') => {

    if (mongoose.Types.ObjectId.isValid(id)) {

        const { estado } = await Anime.findById(id);
        if (!estado) {
            throw new Error(`El id: ${id} no existe en la BD`);
        }
    } else {
        throw new Error(`El id ${id} no es válido`);
    };


};

// Validar colecciones

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion: ${coleccion} no esta permitida. Colecciones permitidas: ${colecciones}`)
    };

    return true;
};


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeMangaPorId,
    existeAnimePorId,
    coleccionesPermitidas,


};