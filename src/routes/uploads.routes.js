const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagenCloudinary, mostrarImagenUsuario } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarJWT, validarCampos, validarArchivo } = require('../middlewares');


const router = Router();


router.post('/', [
    validarJWT,
    validarArchivo,
    validarCampos
], cargarArchivo);

router.put('/:coleccion/:id', [
    validarJWT,
    validarArchivo,
    check('id', 'Id incorrecto. Introduzca un id de mongoDB valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuario'])),
    validarCampos
], actualizarImagenCloudinary);


router.get('/:coleccion/:id', [
    check('id', 'Id incorrecto. Introduzca un id de mongoDB valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuario'])),
    validarCampos
], mostrarImagenUsuario);




module.exports = router;