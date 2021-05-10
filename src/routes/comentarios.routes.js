const { Router } = require('express');
const { check } = require('express-validator');
const { crearComentario, comentarioGet, comentariosGet, comentarioPut, comentarioDelete } = require('../controllers');
const { } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { response, request } = require('express')


const router = Router();


router.get('/', [
    validarCampos
], comentariosGet);

router.get('/ver_comentarios_manga/:id', [
    validarCampos
], comentarioGet);

router.get('/ver_comentarios_anime/:id', [
    validarCampos
], comentarioGet);

router.post('/:id_usuario/add_anime_coment/:id', [
    validarJWT,
    validarCampos
], crearComentario);

router.post('/:id_usuario/add_manga_coment/:id', [
    validarJWT,
    validarCampos
], crearComentario);


router.put('/:id_usuario/:id', [
    validarJWT,
    validarCampos
], comentarioPut);



router.delete('/borrarComentario/:id', [
    validarJWT,
    esAdminRole,
    validarCampos
], comentarioDelete);



module.exports = router;