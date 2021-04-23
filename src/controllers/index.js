const usuarios = require('../controllers/usuarios.controllers');
const auth = require('../controllers/auth.controller');
const animes = require('../controllers/animes.controller');
const mangas = require('../controllers/mangas.controller');
const buscar = require('../controllers/buscar.controller');
const favoritos = require('../controllers/favoritos.controller')



module.exports = {
    ...favoritos,
    ...buscar,
    ...mangas,
    ...auth,
    ...animes,
    ...usuarios
}