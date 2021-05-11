const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Anime, Manga } = require('../models');


let coleccionesPermitidas = [
    'usuarios',
    'animes',
    'mangas',
    'roles'
];


const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []

        });
    };

    const regexp = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regexp }, { correo: regexp }],
        $and: [{ estado: true }]
    });
    const numeroResultados = await Usuario.count({
        $or: [{ nombre: regexp }, { correo: regexp }],
        $and: [{ estado: true }]
    });



    res.json({
        resultados: numeroResultados,
        results: usuarios
    });

};
const buscarAnimes = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const anime = await Anime.findById(termino);
        return res.json({
            results: (anime) ? [anime] : []

        });
    };
    //Busqueda por parametros
    const regexp = new RegExp(termino, 'i');
    const animes = await Anime.find({ "titulos.en": regexp, estado: true });
    const numeroResultados = await Anime.count({
        $or: [{ "titulos.en": regexp }],
        $and: [{ estado: true }]
    });

    res.json({
        resultados: numeroResultados,
        results: animes
    });

};
const buscarMangas = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const manga = await Manga.findById(termino);
        return res.json({
            results: (manga) ? [manga] : []

        });
    };
    //Busqueda por parametros
    const regexp = new RegExp(termino, 'i');
    const mangas = await Manga.find({ "titulos.en_jp": regexp, estado: true })
    const numeroResultados = await Manga.count({
        $or: [{ "titulos.en_jp": regexp }],
        $and: [{ estado: true }]
    });



    res.json({
        resultados: numeroResultados,
        results: mangas
    });

};

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Error: '${coleccion}'.No es una de las colecciones permitidas,estas son: ${coleccionesPermitidas}`
        });
    };

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);

            break;
        case 'animes':
            buscarAnimes(termino, res);

            break;
        case 'mangas':
            buscarMangas(termino, res);

            break;
        default:
            res.status(500).json({

                msg: 'Se me olvido hacer esta busqueda'
            });
    };

};


module.exports = {

    buscar
}