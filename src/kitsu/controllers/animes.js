const axios = require('axios')
const Anime = require('../models/anime');

const saveDocuments = (data) => {


    for (anime_data of data) {


        const anime = new Anime();

        // anime.id = anime_data.id
        anime.titulos = {// Titulos en diferentes idioma
            en: anime_data.attributes.titles.en,
            en_jp: anime_data.attributes.titles.en_jp,
            ja_jp: anime_data.attributes.titles.ja_jp,
        }

        anime.categoria = anime_data.type;
        anime.CreadoEn = anime_data.attributes.startDate;// Comienzo del anime
        anime.FinalizadoEn = anime_data.attributes.endDate;// Fin del anime
        anime.rank_Popularidad = anime_data.attributes.popularityRank;// Popularidad
        anime.edad_Recomendada = anime_data.attributes.ageRating;// Edad recomendada
        anime.PEGI = anime_data.attributes.ageRatingGuide;// Edad recomendada
        anime.formato = anime_data.attributes.subtype;// Formato,television,pelicula
        anime.situacion = anime_data.attributes.status;// Estado terminado,etc
        if (anime_data.attributes.posterImage) {// imagen del manga,distintos tamaños
            anime.imagenes = {
                diminuta: anime_data.attributes.posterImage.hasOwnProperty('tiny') ? anime_data.attributes.posterImage.tiny : '',
                mediana: anime_data.attributes.posterImage.hasOwnProperty('medium') ? anime_data.attributes.posterImage.medium : '',
                pequena: anime_data.attributes.posterImage.hasOwnProperty('original') ? anime_data.attributes.posterImage.small : ''
            }
        };
        anime.youtubeVideoId = anime_data.attributes.youtubeVideoId;// Enlace intro youtube
        anime.formato = anime_data.attributes.showType;// Previsualizacion
        anime.synopsis = anime_data.attributes.synopsis;// Sinopsis
        anime.numero_Episodios = anime_data.attributes.episodeCount// Capitulos
        anime.duracion_Episodios = anime_data.attributes.episodeLength;// Duracion capitulo


        try {
            anime.save((err, animeSave) => {

                if (err) console.log("Se ha producido un error: " + err);

            });

        } catch (e) {
            console.log(e)
        }


    }
}
const setData = async () => {


    let { ...animes_data } = await axios.get("https://kitsu.io/api/edge/anime");// Sintaxis de axios para conectarse a la api de kitsu

    const numero_elementos = animes_data.data.meta.count;// Numero de animes

    let link_next = animes_data.data.links.next;// Paginas por anime,la siguiente

    saveDocuments(animes_data.data.data);// animes_data.data.data(propiedades de cada manga)

    for (let i = 1; i < numero_elementos; ++i) {

        animes_data = await axios.get(link_next);
        link_next = animes_data.data.links.next;

        saveDocuments(animes_data.data.data);
    };

};

const restartCollection = async () => {

    try {
        await Anime.deleteMany();
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    setData, restartCollection
}