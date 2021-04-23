const { Router } = require('express');
const { check } = require('express-validator');
const { favoritoGet, favoritoDelete, animeDelete, AñadirFavorito } = require('../controllers');
const { esRoleValido, existeUsuarioPorId } = require('../helpers');
const { validarCampos, validarJWT } = require('../middlewares')


const router = Router();

// Peticiones 

router.get('/', [
    check('id',).custom(existeUsuarioPorId),
    validarCampos

], favoritoGet);

router.post('/', [
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('correo', 'El correo no es valido').custom(emailExiste).isEmail(),
    // check('password', 'El password debe contener como minimo 6 caracteres').isLength({ min: 6 }),
    // check('rol').custom(esRoleValido),
    validarCampos
], AñadirFavorito);


router.delete('/:id', [
    // validarJWT,
    // esAdminRole,
    // // tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], favoritoDelete);



module.exports = router;

