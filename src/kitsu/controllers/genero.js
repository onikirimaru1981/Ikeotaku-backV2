const axios = require('axios')
const Genero = require('../models/genero');

const saveDocuments = (data) => {

    for (genero_data of data) {

        const genero = Genero();

        genero.tipo = genero_data.attributes.title;
        // console.log(genero);
        genero.descripcion = genero_data.attributes.description;
        // console.log(genero);

        try {
            genero.save((err, generoSave) => {


                if (err) console.log("Se ha producido un error: " + err);

            });

        } catch (e) {
            console.log(e)
        }


    }
}
const setData = async () => {

    let { ...generos_data } = await axios.get("https://kitsu.io/api/edge/categories");// Sintaxis de axios para conectarse a la api de kitsu


    const numero_elementos = generos_data.data.meta.count;// Numero de animes

    let link_next = generos_data.data.links.next;// Paginas por genero,la siguiente

    saveDocuments(generos_data.data.data);// generos_data.data.data(propiedades de cada genero)

    for (let i = 1; i < numero_elementos; ++i) {

        generos_data = await axios.get(link_next);
        link_next = generos_data.data.links.next;

        saveDocuments(generos_data.data.data);// Cada genero
    };

};

const restartCollection = async () => {

    try {
        await Genero.deleteMany();
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    setData, restartCollection
}