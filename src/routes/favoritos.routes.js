const { Router } = require('express');
const { check } = require('express-validator');
const { } = require('../controllers');
const { esRoleValido, existeUsuarioPorId } = require('../helpers');
const { validarCampos, validarJWT, tieneRole } = require('../middlewares')


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
    check('rol').custom(esRoleValido),
    validarCampos

], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').custom(emailExiste).isEmail(),
    check('password', 'El password debe contener como minimo 6 caracteres').isLength({ min: 6 }),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    // tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);



module.exports = router;

