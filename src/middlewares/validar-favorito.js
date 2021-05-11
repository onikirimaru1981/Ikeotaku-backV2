const { response, request } = require('express');
const { Anime, Manga, Usuario } = require('../models');

const existeAnimeFavorito = async (req = request, res = response, next) => {

    const limiteFavoritos = 10;
    const { id, id_usuario: _id } = req.params;
    const { animesFavoritos } = await Usuario.findById(_id);
    const longAnimes = animesFavoritos.length;
    const anime = await Anime.findOne({ id });
    const idFavorito = animesFavoritos.includes(anime._id);

    if (longAnimes >= 9) {
        res.status(401).json({ msg: `ha superado el limite de favoritos`, limite: limiteFavoritos });
    };


    if (idFavorito) {
        return res.status(401).json({
            msg: 'La seleccion ya esta incluida en la coleccion favoritos'
        });
    };

    next();
};

const existeMangaFavorito = async (req = request, res = response, next) => {

    const limiteFavoritos = 10;
    const { id, id_usuario: _id } = req.params;
    const { mangasFavoritos } = await Usuario.findById(_id);
    const longMangas = mangasFavoritos.length;
    const manga = await Manga.findOne({ id });
    const idFavorito = mangasFavoritos.includes(manga._id);

    if (longMangas >= 9) {
        res.status(401).json({ msg: `ha superado el limite de favoritos`, limite: limiteFavoritos });
    };

    if (idFavorito) {
        return res.status(401).json({
            msg: 'La seleccion ya esta incluida en la coleccion favoritos'
        });
    };

    next();
};

const existeAnimeFavoritoPorId = async (req = request, res = response, next) => {

    const { id_usuario: _id, id } = req.params;
    const { animesFavoritos } = await Usuario.findById(_id);
    const anime = await Anime.findOne({ id });
    const idFavorito = await animesFavoritos.includes(anime._id);

    if (!idFavorito) {
        return res.status(401).json({
            msg: 'El anime que intenta borrar de la lista de favoritos ya no existe'
        });
    };

    next();

};

const existeMangaFavoritoPorId = async (req = request, res = response, next) => {

    const { id_usuario: _id, id } = req.params;
    const { mangasFavoritos } = await Usuario.findById(_id);
    const manga = await Manga.findOne({ id });
    const idFavorito = await mangasFavoritos.includes(manga._id);

    if (!idFavorito) {
        return res.status(401).json({
            msg: 'El manga que intenta borrar de la lista de favoritos ya no existe'
        });
    };

    next();

};


module.exports = {
    existeAnimeFavorito,
    existeMangaFavorito,
    existeAnimeFavoritoPorId,
    existeMangaFavoritoPorId
};