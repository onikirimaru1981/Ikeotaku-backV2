const usuarios = require('../controllers/usuarios.controllers');
const auth = require('../controllers/auth.controller');
const animes = require('../controllers/animes.controller');
const mangas = require('../controllers/mangas.controller');
const buscar = require('../controllers/buscar.controller');




module.exports = {
    ...buscar,
    ...mangas,
    ...auth,
    ...animes,
    ...usuarios
}