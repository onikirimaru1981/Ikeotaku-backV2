const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');



//                                                                      Validacion login usuario

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Pasword no son correctos'//-correo
            });
        };

        //Comprobar si el user esta en mi base de datos
        if (!usuario.estado) {// Si usuario.estado es false
            return res.status(400).json({
                msg: 'Usuario / Pasword no son correctos'//-estado:false'
            });
        };

        // Comprobar si es usuario google

        if (usuario.google) {
            // console.log('todo ok');
            const token = await generarJWT(usuario.id);
        } else {

            // Verificar la contraseña
            const validPassword = bcryptjs.compareSync(password, usuario.password);// Metodo compareSyn es util para comparar el password de nuestra bd con el de la peticion de login
            if (!validPassword) {
                return res.status(400).json({

                    msg: 'Usuario - Password no son correctos'// - passsword
                })

            }
        }


        // Generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Token generado satisfactoriamente',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Pongase en contacto con el administrador'
        });
    };


};


//                                 Google Signin

const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;
    try {


        const { correo, nombre, img } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });
        const googlePass = process.env.GOOGLE_PASSWORD
        const salt = bcryptjs.genSaltSync(10);
        password = bcryptjs.hashSync(googlePass, salt);

        if (!usuario) {

            const data = {
                nombre,
                correo,
                password,
                img,
                google: true
            }
            usuario = await new Usuario(data);
            console.log(usuario);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({

                msg: 'Contacte con el administrador: Usuario bloqueado'
            })

        }

        // Generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Token generado satisfactoriamente',
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido'
        });

    };

};




module.exports = {

    login,
    googleSignin
}