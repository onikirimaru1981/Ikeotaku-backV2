const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Manga } = require('../models');

//                                                                            Peticiones

const mangasGet = async (req = request, res = response) => {
    try {

        const { limit, page } = req.query;
        const query = { estado: true };
        const opcionesPaginate = {
            sort: { id: 1 },
            allowDiskUse: true,
            limit,
            page
        };

        // Paginacion
        const [paginado, mangasTotales] = await Promise.all([
            Manga.paginate(query, opcionesPaginate),
            Manga.countDocuments(query),
        ]);

        let { totalPages: paginasTotales, nextPage: proximaPagina, page: paginaActual, docs: mangas } = paginado

        if (proximaPagina === null) {
            proximaPagina = 'No hay mas paginas'

        }
        res.json({
            msg: 'Listado de mangas',
            mangasTotales,
            paginasTotales,
            paginaActual,
            proximaPagina,
            mangas
        });



    } catch (error) {
        res.status(401).json({


            msg: 'Pongase en contacto con el administrador'
        });

    };



};

const mangaGet = async (req, res = response) => {

    const mangaId = req.params.id;

    const manga = await Manga.findOne({ id: mangaId });

    if (!manga) {

        res.status(400).json(
            { msg: `El manga con id: ${mangaId} que intenta solicitar no existe` });
    };

    const { estado, id } = manga

    console.log(estado, id);

    if (!estado) {
        res.status(400).json(
            { msg: `El manga con el id: ${id} que intenta solicitar ya no existe  en la DB` });
    };

    res.status(200).json({

        msg: `Manga con id: ${id}`,
        manga
    });

};



const mangaPut = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body

    body.usuario = req.usuario._id

    const manga = await Manga.findOneAndUpdate({ id }, body, { new: true })

    res.status(202).json({

        msg: 'Actualizacion realizada con exito',
        manga
    });


};


const mangaDelete = async (req, res = response) => {

    let { id } = req.params;


    await Manga.findOneAndUpdate({ id }, { estado: false }, { new: true });

    res.json({

        msg: `El manga con el id: ${id} ha sido borrado correctamente`

    });

};

module.exports = {
    mangaGet,
    mangasGet,
    mangaPut,
    mangaDelete
}






