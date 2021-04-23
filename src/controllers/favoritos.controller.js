const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Favorito, Usuario, Anime, Manga } = require('../models');

// Peticiones



const favoritoGet = async (req = request, res = response) => {
    try {
        const { limit, page } = req.query;
        const query = { estado: true };
        const opcionesPaginate = {

            limit,
            page
        };

        // Paginacion
        const [paginado, usuariosTotales] = await Promise.all([
            Usuario.paginate(query, opcionesPaginate),
            Usuario.countDocuments(query),

        ]);


        let { totalPages: paginasTotales, nextPage: proximaPagina, page: paginaActual, docs: usuarios } = paginado

        if (proximaPagina === null) {
            proximaPagina = 'No hay mas paginas'

        }
        res.json({
            msg: 'Listado de usuarios',
            usuariosTotales,
            paginasTotales,
            paginaActual,
            proximaPagina,
            usuarios,
        });



    } catch (error) {
        res.status(401).json({


            msg: 'Pongase en contacto con el administrador'
        });

    };



};



const AñadirFavorito = async (req, res = response) => {


    const { anime, usuario } = req.body;
    // const query = { estado: true };
    console.log(anime);

    const { titulosAnime, idAnime } = await Anime.findById(anime);
    const { nombreUser, idUser } = await Usuario.findById(usuario);


    if (anime.titulos) {
        titulos = {
            en: titulos.hasOwnProperty('en') ? titulos.en : '',
            en_jp: titulos.hasOwnProperty('en') ? titulos.en_jp : '',
            ja_jp: titulos.hasOwnProperty('en') ? titulos.ja_jp : ''
        }
    };

    let data = { titulosAnime, idAnime, nombreUser, idUser }


    // console.log(data);
    // const usuarioF = await Usuario.findById({ usuario, estado: true })


    console.log(data);



    const favorito = new Favorito(data);

    console.log(favorito);



    // // Guardar en BD el registro

    // await usuario.save();
    res.json({

        msg: 'Usuario creado y guardado correctamente',
        data
    });


};




const favoritoDelete = async (req, res = response) => {
    try {
        let { id } = req.params;

        //Borrado sin perder dato

        const usuarioBorrado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.json({

            msg: `El usuario: ${usuarioBorrado.nombre} con el id: ${id} ha sido borrado correctamente`

        });

    } catch (error) {
        res.status(401).json({


            msg: 'Pongase en contacto con el administrador'
        });

    };



};

module.exports = {
    favoritoGet,
    favoritoDelete,
    AñadirFavorito
}
