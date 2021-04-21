const usuarios = require('../controllers/usuarios.controllers');
const auth = require('../controllers/auth.controller');
const animes = require('../controllers/animes.controller');
const mangas = require('../controllers/mangas.controller')



module.exports = {
    ...mangas,
    ...auth,
    ...animes,
    ...usuarios
}