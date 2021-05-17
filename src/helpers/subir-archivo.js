const path = require('path')
const { v4: uuidv4 } = require('uuid');

const subirArchivo = async (files, extensionesValidas = ['png', 'jpg', 'bmp', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //                                      Validar extension

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension: ${extension} no es valida. Extensiones permitidas: ${extensionesValidas}`);

        };

        //                                            Subida de archivo

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            };

            resolve(nombreTemp);
        });

    });







};

module.exports = {

    subirArchivo
};