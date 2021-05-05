const axios = require('axios')
const Manga = require('../models/manga');

const saveDocuments = (data) => {

    for (manga_data of data) {

        const manga = Manga();

        manga.id = manga_data.id
        manga.titulos = {// Titulos en diferentes idiomas
            en: manga_data.attributes.titles.en,
            en_jp: manga_data.attributes.titles.en_jp,
            ja_jp: manga_data.attributes.titles.ja_jp,
        }
        manga.creadoEn = manga_data.attributes.startDate;// Comienzo del anime
        manga.finalizadoEn = manga_data.attributes.endDate;// Fin del anime
        manga.rank_Popularidad = manga_data.attributes.popularityRank;// Popularidad
        manga.synopsis = manga_data.attributes.synopsis;// Sinopsis
        manga.edad_Recomendada = manga_data.attributes.ageRating;// Edad recomendada
        manga.PEGI = manga_data.attributes.ageRatingGuide;// Edad recomendada
        manga.situacion = manga_data.attributes.status;// Estado terminado,etc
        if (manga_data.attributes.posterImage) {// imagen del manga,distintos tamaños
            manga.imagenes = {
                diminuta: manga_data.attributes.posterImage.hasOwnProperty('tiny') ? manga_data.attributes.posterImage.tiny : '',
                mediana: manga_data.attributes.posterImage.hasOwnProperty('medium') ? manga_data.attributes.posterImage.medium : '',
                pequena: manga_data.attributes.posterImage.hasOwnProperty('small') ? manga_data.attributes.posterImage.small : ''
            }
        }
        manga.capitulos = manga_data.attributes.chapterCount;// Capitulos
        manga.volumenes = manga_data.attributes.volumeCount;// Volumenes
        manga.editorial = manga_data.attributes.serialization;// Editorial
        manga.categoria = manga_data.attributes.mangaType;// genero manga

        try {
            manga.save((err, animeSave) => {
                if (err) console.log("Se ha producido un error: " + err);
            });
        } catch (e) {
            console.log(e)
        }


    }
}
const setData = async () => {


    let mangas_data = await axios.get("https://kitsu.io/api/edge/manga");

    const numero_elementos = mangas_data.data.meta.count;
    let link_next = mangas_data.data.links.next;
    saveDocuments(mangas_data.data.data);

    for (let i = 10; i < numero_elementos; i += 10) {

        mangas_data = await axios.get(link_next);
        link_next = mangas_data.data.links.next;

        saveDocuments(mangas_data.data.data);

    }

}

const restartCollection = async () => {

    try {
        await Manga.deleteMany();
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    setData, restartCollection
}