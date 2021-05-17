const dbValidators = require('./db-validators');
const generarJwt = require('./generar-jwt');
const subirArchivos = require('./subir-archivo');
const googleVerify = require('./google-verify');





module.exports = {
    ...dbValidators,
    ...generarJwt,
    ...subirArchivos,
    ...googleVerify
  

};