const { Router } = require('express');
const { check } = require('express-validator');
const { animeGet, animesGet, animePut, animeDelete } = require('../controllers');
const { existeAnimePorId } = require('../helpers');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');


const router = Router();

// Peticiones 

router.get('/', [
    validarCampos

], animesGet);


router.get('/:id', [
    check('id',).custom(existeAnimePorId),
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
    check('id').custom(existeAnimePorId),
    validarCampos
], animeDelete);



module.exports = router;