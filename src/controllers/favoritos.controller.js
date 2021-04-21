const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Favorito, Usuario, Anime, Manga } = require('../models');

// Peticiones



const favoritosGet = async (req = request, res = response) => {
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


    const data = req.body;
    const usuario = new Favorito({ nombre, correo, password, rol, fechaNacimiento });



    // // Guardar en BD el registro

    await usuario.save();
    res.json({

        msg: 'Usuario creado y guardado correctamente',
        usuario
    });


};

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, rol, ...resto } = req.body;



    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    };

    await Usuario.findById(id, (error, user) => {
        const estadoUser = user.estado

        if (!estadoUser) {
            res.status(400).json(
                {
                    msg: 'El usuario que intenta actualizar no existe en la BD'

                });
        };

    });

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.status(202).json({

        msg: 'Actualizacion realizada con exito',
        usuario

    });


};


const usuariosDelete = async (req, res = response) => {
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
    usuarioGet,
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
