const { Router } = require('express');
const { check } = require('express-validator');
const { mangaGet, mangasGet, mangaPut, mangaDelete } = require('../controllers');
const { esRoleValido, emailExiste, existeMangaPorId } = require('../helpers');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')


const router = Router();

// Peticiones 

router.get('/', [
    validarCampos

], mangasGet);


router.get('/:id', [
    check('id',).custom(existeMangaPorId),
    validarCampos

], mangaGet);


router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id',).custom(existeMangaPorId),
    validarCampos

], mangaPut);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    // tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id').custom(existeMangaPorId),
    validarCampos
], mangaDelete);



module.exports = router;