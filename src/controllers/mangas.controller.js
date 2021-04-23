const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Manga } = require('../models');

// Peticiones



const mangasGet = async (req = request, res = response) => {
    try {

        const { limit, page } = req.query;
        const query = { estado: true };
        const opcionesPaginate = {
            sort: { titulos: 1 },
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
    const manga = await Manga.findById(mangaId);

    const { estado, id } = manga


    if (manga === null) {
        res.status(400).json(
            { msg: `El manga con el id: ${id} que intenta solicitar ya no existe  en la DB` });

    }
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

    const manga = await Manga.findByIdAndUpdate(id, body, { new: true })

    res.status(202).json({

        msg: 'Actualizacion realizada con exito',
        manga
    });


};


const mangaDelete = async (req, res = response) => {
    // try {
    let { id } = req.params;

    //Borrado sin perder dato

    const mangaBorrado = await Manga.findByIdAndUpdate(id, { estado: false }, { new: true });
    console.log(mangaBorrado.titulo.en);


    res.json({

        msg: `El manga: ${mangaBorrado.titulo.en} con el id: ${id} ha sido borrado correctamente`

    });

    // } catch (error) {
    //     res.status(401).json({


    //         msg: 'Pongase en contacto con el administrador'
    //     });

    // };

};

module.exports = {
    mangaGet,
    mangasGet,
    mangaPut,
    mangaDelete
}






