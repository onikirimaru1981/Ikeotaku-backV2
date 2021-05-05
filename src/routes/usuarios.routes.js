const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosDelete, usuariosGet, usuariosPost, usuariosPut, usuarioGet, añadirFavorito, eliminarFavorito } = require('../controllers');
const { esRoleValido, emailExiste, existeUsuarioPorId, existeAnimePorId, existeMangaPorId } = require('../helpers');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')
const { existeMangaFavorito, existeAnimeFavorito } = require('../middlewares/validar-favorito');


const router = Router();

// Peticiones 

router.get('/', [
    validarCampos

], usuariosGet);


router.get('/:id', [
    check('id',).custom(existeUsuarioPorId),
    validarCampos

], usuarioGet);


router.put('/:id', [
    validarJWT,
    check('id',).custom(existeUsuarioPorId),
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos

], usuariosPut);

router.post('/:id_usuario/add_anime_favorito/:id', [
    validarJWT,
    existeAnimeFavorito,
    validarCampos

], añadirFavorito);

router.post('/:id_usuario/add_manga_favorito/:id', [
    validarJWT,
    existeMangaFavorito,
    validarCampos

], añadirFavorito);

router.delete('/:id_usuario/add_anime_favorito/:id', [
    validarJWT,
    // check('id',).custom(existeUsuarioPorId),
    // tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos

], eliminarFavorito);

router.delete('/:id_usuario/add_manga_favorito/:id', [
    validarJWT,
    // check('id',).custom(existeUsuarioPorId),
    // tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos

], eliminarFavorito);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').custom(emailExiste).isEmail(),
    check('password', 'El password debe contener como minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], usuariosPost);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);



module.exports = router;

