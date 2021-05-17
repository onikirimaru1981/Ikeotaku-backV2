const path = require('path');
const fs = require('fs')
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario } = require('../models');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const cargarArchivo = async (req, res = response) => {


    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ msg: `Archivo subido satisfactoriamente: ${nombre}` });

    } catch (msg) {
        res.status(400).json({ msg });
    };

};

const actualizarImagen = async (req, res = response) => {

    const { coleccion, id } = req.params;
    let modelo;
    try {

        switch (coleccion) {
            case 'usuario':

                modelo = await Usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({ msg: `No existe un usuario con el id: ${id}` });
                };
                break;
            default:
                return res.status(500).json({ msg: ' Se me olvido validar esto' });
        };

        if (modelo.img) {


            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

            if (fs.existsSync(pathImagen)) {

                fs.unlinkSync(pathImagen)
            };
        };

    } catch (error) {

        res.status(500).json(error)

    };

    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
};


const mostrarImagenUsuario = async (req, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;

    try {

        switch (coleccion) {
            case 'usuario':

                modelo = await Usuario.findById(id);

                if (!modelo) {
                    return res.status(400).json({ msg: `No existe un usuario con el id: ${id}` });
                };
                break;

            default:
                return res.status(500).json({ msg: ' Se me olvido validar esto' });
        };

        if (modelo.img) {

            return res.json({
                img: modelo.img
            });

        } else {

            const pathImagen = path.join(__dirname, '../assets', '../assets/no-image.jpg');

            return res.sendFile(pathImagen)
        }

    } catch (error) {

        res.status(500).json(error)

    };

};



const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;
    try {


        switch (coleccion) {
            case 'usuario':

                modelo = await Usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({ msg: `No existe un usuario con el id: ${id}` });
                };
                break;
            default:
                return res.status(500).json({ msg: ' Se me olvido validar esto' });
        };

        //                        
        if (modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        };
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

        modelo.img = secure_url;

        await modelo.save();

        res.json(modelo);

    } catch (error) {

        res.status(500).json(error)

    };

};


module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagenUsuario
};