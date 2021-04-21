const { Router } = require('express');
const { check } = require('express-validator');
const { animeGet, animesGet, animePut, animeDelete } = require('../controllers');
const { esRoleValido, emailExiste, existeAnimePorId } = require('../helpers');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')


const router = Router();

// Peticiones 

router.get('/', [
    validarCampos

], animesGet);


router.get('/:id', [
    // check('id',).custom(existeUsuarioPorId),
    validarCampos

], animeGet);


router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id',).custom(existeAnimePorId),
    validarCampos

], animePut);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    // tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id').custom(existeAnimePorId),
    validarCampos
], animeDelete);



module.exports = router;