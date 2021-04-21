const validarArchivo = require('../middlewares/validar-archivo');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');


// Exportando cada validador utilizando el operador spread

module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}