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
    const anime = await Anime.findById(animeId);

    const { estado, id } = anime


    if (anime === null) {
        res.status(400).json(
            { msg: `El anime con el id: ${id} que intenta solicitar ya no existe  en la DB` });

    }
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
    const { estado, usuario, ...body } = req.body

    body.usuario = req.usuario._id

    // //Codigo para actualizar con el metodo findByIdAndUpdate
    const anime = await Anime.findByIdAndUpdate(id, body, { new: true })// La opcion new true devuelve ya el dato actualizado

    res.status(202).json({

        msg: 'Actualizacion realizada con exito',
        anime
    });


};


const animeDelete = async (req, res = response) => {
    // try {
    let { id } = req.params;

    //Borrado sin perder dato

    const animeBorrado = await Anime.findByIdAndUpdate(id, { estado: false }, { new: true });
    console.log(animeBorrado);


    res.json({

        msg: `El anime: ${animeBorrado.titulos.en} con el id: ${id} ha sido borrado correctamente`

    });

    // } catch (error) {
    //     res.status(401).json({


    //         msg: 'Pongase en contacto con el administrador'
    //     });

    // };

};

module.exports = {
    animeGet,
    animesGet,
    animePut,
    animeDelete
}






