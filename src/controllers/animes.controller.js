const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Anime } = require('../models');

// Peticiones

const animesGet = async (req = request, res = response) => {
    try {

        const { limit, page } = req.query;
        const query = { estado: true };
        const opcionesPaginate = {
            sort: { id: 'asc' },
            limit,
            page
        };

        // Paginacion
        const [paginado, animesTotales] = await Promise.all([
            Anime.paginate(query, opcionesPaginate),
            Anime.countDocuments(query),
        ]);

        let { totalPages: paginasTotales, nextPage: proximaPagina, page: paginaActual, docs: animes } = paginado

        if (proximaPagina === null) {
            proximaPagina = 'No hay mas paginas'

        }
        res.json({
            msg: 'Listado de animes',
            animesTotales,
            paginasTotales,
            paginaActual,
            proximaPagina,
            animes
        });

    } catch (error) {
        res.status(401).json({


            msg: 'Pongase en contacto con el administrador'
        });

    };

};

const animeGet = async (req, res = response) => {

    const animeId = req.params.id;

    const anime = await Anime.findOne({ id: animeId });

    if (!anime) {

        res.status(400).json(
            { msg: `El anime con id: ${animeId} que intenta solicitar no existe` });
    };

    const { estado, id } = anime

    if (!estado) {
        res.status(400).json(
            { msg: `El anime con el id: ${id} que intenta solicitar ya no existe  en la DB` });
    };

    res.status(200).json({

        msg: `Anime con id: ${id}`,
        anime
    });

};



const animePut = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    body.usuario = req.usuario._id;

    const anime = await Anime.findOneAndUpdate({ id }, body, { new: true });

    res.status(202).json({

        msg: 'Actualizacion realizada con exito',
        anime
    });


};


const animeDelete = async (req, res = response) => {

    let { id } = req.params;

    await Anime.findOneAndUpdate({ id }, { estado: false }, { new: true });

    res.json({

        msg: `El anime con el id: ${id} ha sido borrado correctamente`

    });

};

module.exports = {
    animeGet,
    animesGet,
    animePut,
    animeDelete
}






