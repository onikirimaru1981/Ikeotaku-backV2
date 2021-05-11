const { response, request } = require('express');
const { Comentario } = require('../models');
const { Usuario, Anime, Manga } = require('../models');



const comentariosGet = async (req = request, res = response) => {

    const { limit, page } = req.query;
    const query = { estado: true };

    const opcionesPaginate = {
        sort: { _id: "asc" },
        populate: { path: 'usuario anime manga', select: 'nombre titulos.en titulos.en_jp' },
        limit,
        page
    };


    let [paginado, comentariosTotales] = await Promise.all([
        Comentario.paginate(query, opcionesPaginate),
        Comentario.countDocuments(query),

    ]);



    let { totalPages: paginasTotales, nextPage: proximaPagina, page: paginaActual, docs: comentarios } = paginado;
    if (proximaPagina === null) {
        proximaPagina = 'No hay mas paginas'

    };

    // Respuesta
    res.json({

        msg: 'Listado de comentarios',
        comentariosTotales,
        paginasTotales,
        paginaActual,
        proximaPagina,
        comentarios,


    });

};


const comentarioGetManga = async (req, res = response) => {
    const comentarioId = req.params.id;
    console.log(comentarioId);


    const comentario = await Comentario.findById(comentarioId).populate({ path: 'creado_por anime  ', select: 'nombre titulos.en' })

    if (!comentario.estado) {
        res.status(400).json({ msg: `El comentario que intenta solicitar no existe` });
    };

    res.status(200).json({
        msg: 'Comentario solicitado',
        comentario
    });


};

const comentarioGetAnime = async (req, res = response) => {
    const comentarioId = req.params.id;
    const originalUrl = req.originalUrl;

    const comentario = originalUrl.includes('anime') ?
        await Comentario.findById(comentarioId).populate({ path: 'creado_por anime  ', select: 'nombre titulos.en' }) :
        originalUrl.includes('manga') ?
            await Comentario.findById(comentarioId).populate({ path: 'creado_por manga  ', select: 'nombre titulos.en_jp' }) :
            console.log('Error');

    if (!comentario.estado) {
        res.status(400).json({ msg: `El comentario que intenta solicitar ya no existe` });
    };

    res.status(200).json({
        msg: 'Comentario solicitado',
        comentario
    });


};


const crearComentario = async (req = request, res = response) => {

    const { comentario } = req.body;
    const { id_usuario: _id, id } = req.params;
    const originalUrl = req.originalUrl;

    const [usuario, anime, manga] = await Promise.all([
        Usuario.findOne({ _id }),
        Anime.findById(id),
        Manga.findById(id),
    ]);

    (!manga & originalUrl.includes('manga')) ? res.status(401).json({ msg: 'Error,el manga que intenta comentar no existe' }) :
        (!anime & originalUrl.includes('anime')) ? res.status(401).json({ msg: 'Error,el anime que intenta comentar no existe' }) : console.log('Contacte con el administrador');


    const data = originalUrl.includes('anime') ? { comentario, anime: anime._id, creado_por: usuario._id } :
        originalUrl.includes('manga') ? { comentario, manga: manga._id, creado_por: usuario._id } : console.log('Error');

    const comentarioDb = await new Comentario(data);
    const idComentario = comentarioDb._id;

    await comentarioDb.save();


    originalUrl.includes('anime') ? anime.comentarios.push(idComentario) & await anime.save() :
        originalUrl.includes('manga') ? manga.comentarios.push(idComentario) & await manga.save() : console.log('Error');

    res.json({

        msg: 'Comentario creado y guardado correctamente',
        comentario: comentarioDb,

    });

};


const comentarioPut = async (req, res = response) => {


    const { id_usuario, id } = req.params;
    const data = req.body

    comentarioDb = await Comentario.findById(id);
    const comentarioPut = (comentarioDb.creado_por == id_usuario) ? await Comentario.findByIdAndUpdate(id, data, { new: true })
        : res.status(401).json({ msg: 'Error: modificacion de comentario solo posible por usuario que lo creo' })

    console.log(comentarioPut);
    res.status(202).json({

        msg: 'Actualizacion realizada con exito',
        comentarioPut
    });

};


const comentarioDeleteAnime = async (req, res = response) => {

    let { id } = req.params;

    const { anime } = await Comentario.findByIdAndUpdate(id, { estado: false }, { new: true });
    console.log(anime);

    await Anime.findByIdAndUpdate(anime, { $pull: { 'comentarios': id } }, { new: true });

    res.json({
        msg: `El comentario con el id: ${id} ha sido borrado correctamente`
    });

};

const comentarioDeleteManga = async (req, res = response) => {

    let { id } = req.params;

    const { manga } = await Comentario.findByIdAndUpdate(id, { estado: true }, { new: true });

    await Manga.findByIdAndUpdate(manga, { $pull: { 'comentarios': id } }, { new: true });
    res.json({

        msg: `El comentario con el id: ${id} ha sido borrado correctamente`

    });

};



module.exports = {
    crearComentario,
    comentariosGet,
    comentarioGetAnime,
    comentarioGetManga,
    comentarioPut,
    comentarioDeleteAnime,
    comentarioDeleteManga

};