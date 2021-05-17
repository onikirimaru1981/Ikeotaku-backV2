
const animes = require('../controllers/animes.controller');
const auth = require('../controllers/auth.controller');
const buscar = require('../controllers/buscar.controller');
const comentarios = require('../controllers/comentarios.controller');
const mangas = require('../controllers/mangas.controller');
const usuarios = require('./usuarios.controller');
const uploads = require('../controllers/uploads.controller')




module.exports = {
    ...animes,
    ...auth,
    ...buscar,
    ...comentarios,
    ...mangas,
    ...usuarios,
    ...uploads
};