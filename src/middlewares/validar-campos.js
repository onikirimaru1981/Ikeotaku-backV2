const { validationResult } = require('express-validator');

//  mostrar resultado de validacion en caso de que hubieran errores por parte de express-validation

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    };

    next();

};

module.exports = {
    validarCampos
};