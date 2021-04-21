const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models');

// Peticiones



const usuariosGet = async (req = request, res = response) => {
    try {

        const { limit, page } = req.query;
        const query = { estado: true };
        const opcionesPaginate = {
            sort: { nombre: 1 },
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

const usuarioGet = async (req, res = response) => {

    const usuarioId = req.params.id;
    console.log(usuarioId);
    const usuario = await Usuario.findById(usuarioId);

    const { estado, id } = usuario


    if (usuario === null) {
        res.status(400).json(
            { msg: `El usuario con el id: ${id} que intenta solicitar ya no existe  en la DBss` });

    }
    if (!estado) {
        res.status(400).json(
            { msg: `El usuario con el id: ${id} que intenta solicitar ya no existe  en la DB` });
    };

    res.status(200).json({

        msg: `Usuario con id: ${id}`,
        usuario
    });

};



const usuariosPost = async (req, res = response) => {

    try {
        const { nombre, correo, password, rol, fechaNacimiento } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol, fechaNacimiento });

        //Encriptar contraseña

        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password, salt);

        // // Guardar en BD el registro

        await usuario.save();
        res.json({

            msg: 'Usuario creado y guardado correctamente',
            usuario
        });

    } catch (error) {
        res.status(401).json({


            msg: 'Pongase en contacto con el administrador'
        });

    };

};

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, ...resto } = req.body;

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






