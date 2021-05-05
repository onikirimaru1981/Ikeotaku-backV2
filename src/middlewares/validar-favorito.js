const { response, request } = require('express');
const Usuario = require('../models/usuario');


const existeAnimeFavorito = async (req = request, res = response, next) => {

    const limiteFavoritos = 10;

    const { id, id_usuario: _id } = req.params;

    const originalUrl = req.originalUrl;



    const { animesFavoritos } = await Usuario.findById(_id);

    const longAnimes = animesFavoritos.length;


    (longAnimes >= 10) ? res.status(401).json({ msg: `ha superado el limite de favoritos`, limite: limiteFavoritos }) :
        console.log('error');


    const idFavorito =
        originalUrl.includes('anime') ? await animesFavoritos.find(element => element == id) :
            console.log('error');


    if (idFavorito) {

        return res.status(401).json({

            msg: 'La seleccion ya esta incluida en la coleccion favoritos'
        })

    };


    next();
};
const existeMangaFavorito = async (req = request, res = response, next) => {

    const limiteFavoritos = 10;

    const { id, id_usuario: _id } = req.params;

    const originalUrl = req.originalUrl;



    const { mangasFavoritos } = await Usuario.findById(_id);

    const longMangas = mangasFavoritos.length;



    (longMangas >= 10) ? res.status(401).json({ msg: `ha superado el limite de favoritos`, limite: limiteFavoritos }) :
        console.log('error');


    const idFavorito =
        originalUrl.includes('manga') ? await mangasFavoritos.find(element => element == id) :
            console.log('error');


    if (idFavorito) {

        return res.status(401).json({

            msg: 'La seleccion ya esta incluida en la coleccion favoritos'
        })

    };


    next();
};




module.exports = {

    existeAnimeFavorito,
    existeMangaFavorito
}