require("dotenv").config();
const mongoose = require('mongoose')
const animes = require('./controllers/animes')
const mangas = require('./controllers/mangas')
const generos = require('./controllers/genero')

mongoose.connect(process.env.SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

(async () => {

    //Obtenemos los Animes y mangas

    // console.log("Iniciamos la carga de 'Animes'")
    // animes.restartCollection();
    // await animes.setData();
    // console.log("Iniciamos la carga de 'Generos'")
    // generos.restartCollection();
    // await generos.setData();

    // console.log("Iniciamos la carga de 'Mangas'");
    // mangas.restartCollection();
    // await mangas.setData();

    console.log("Carga de datos terminada con exito");

    process.exit();
})();







