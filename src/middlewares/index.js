const validarArchivo = require('../middlewares/validar-archivo');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarFavorito = require('../middlewares/validar-favorito');


// Exportando cada validador utilizando el operador spread

module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarFavorito
}