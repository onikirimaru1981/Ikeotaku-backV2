const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    // Validacion de si existe token
    if (!token) {
        return res.status(401).json({

            msg: 'No hay token en la peticion'
        });

    };

    // Validar si JWT es valido
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        // Verificar si el usuario del cual se utiliza el token parar borrar esta en la BD

        if (!usuario) {
            return res.status(401).json({

                msg: 'Token no valido'// Usuario no existe en la DB '
            });
        };


        // Verificar si el  usuario del cual se utiliza el token para borrar tiene estado en true o false

        if (!usuario.estado) {
            return res.status(401).json({

                msg: 'Token no valido'// Usuario con estado: false'
            });

        };
        req.uid = uid;
        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({

            msg: 'Token no valido'
        });

    };

};



module.exports = {

    validarJWT
};