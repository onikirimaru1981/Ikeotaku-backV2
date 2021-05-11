const { Router } = require('express');
const { check } = require('express-validator');
const { crearComentario, comentarioGetManga, comentariosGet, comentarioPut, comentarioDeleteManga, comentarioDeleteAnime, comentarioGetAnime, crearComentarioManga, crearComentarioAnime, comentarioGet } = require('../controllers');
const { } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { response, request } = require('express')


const router = Router();


router.get('/', [
    validarCampos
], comentariosGet);

router.get('/ver_comentario/:id', [
    validarCampos
], comentarioGet);

router.post('/:id_usuario/add_anime_coment/:id', [
    validarJWT,
    validarCampos
], crearComentarioAnime);

router.post('/:id_usuario/add_manga_coment/:id', [
    validarJWT,
    validarCampos
], crearComentarioManga);


router.put('/:id_usuario/:id', [
    validarJWT,
    validarCampos
], comentarioPut);



router.delete('/borrarComentarioManga/:id', [
    validarJWT,
    esAdminRole,
    validarCampos
], comentarioDeleteManga);

router.delete('/borrarComentarioAnime/:id', [
    validarJWT,
    esAdminRole,
    validarCampos
], comentarioDeleteAnime);


module.exports = router;