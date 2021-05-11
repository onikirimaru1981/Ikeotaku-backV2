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


const comentarioGet = async (req, res = response) => {

    const comentarioId = req.params.id;
    const comentario = await Comentario.findById(comentarioId).populate({ path: 'creado_por anime manga  ', select: 'nombre titulos.en titulos.en_jp' })

    if (!comentario) {
        res.status(400).json({ msg: `El comentario que intenta solicitar no existe` });
    }

    if (!comentario.estado) {
        res.status(400).json({ msg: `El comentario que intenta solicitar no existe` });
    };

    res.status(200).json({
        msg: 'Comentario solicitado',
        comentario
    });


};

const crearComentarioAnime = async (req = request, res = response) => {

    const { comentario } = req.body;
    const { id_usuario: _id, id } = req.params;
    const [usuario, anime] = await Promise.all([
        Usuario.findById(_id),
        Anime.findOne({ id }),
    ]);

    if (!anime) {
        res.status(401).json({ msg: 'Error,el anime que intenta comentar no existe' });
    };

    const data = {
        comentario,
        anime: anime._id,
        creado_por: usuario._id
    };

    const comentarioDb = await new Comentario(data);
    await comentarioDb.save();
    const idAnime = anime._id;
    const idComentario = comentarioDb._id;
    await Anime.findByIdAndUpdate(idAnime, { $push: { 'comentarios': idComentario } }, { new: true });

    res.json({
        msg: 'Comentario creado y guardado correctamente',
        comentario: comentarioDb
    });

};
const crearComentarioManga = async (req = request, res = response) => {

    const { comentario } = req.body;
    const { id_usuario: _id, id } = req.params;
    const [usuario, manga] = await Promise.all([
        Usuario.findById(_id),
        Manga.findOne({ id }),
    ]);

    if (!manga) {
        res.status(401).json({ msg: 'Error,el manga que intenta comentar no existe' });
    };

    const data = {
        comentario,
        manga: manga._id,
        creado_por: usuario._id
    };

    const comentarioDb = await new Comentario(data);
    await comentarioDb.save();
    const idManga = manga._id;
    const idComentario = comentarioDb._id
    await Manga.findByIdAndUpdate(idManga, { $push: { 'comentarios': idComentario } }, { new: true });

    res.json({
        msg: 'Comentario creado y guardado correctamente',
        comentario: comentarioDb
    });
};


const comentarioPut = async (req, res = response) => {

    const { id_usuario, id } = req.params;
    const data = req.body

    comentarioDb = await Comentario.findById(id);

    const comentarioPut = (comentarioDb.creado_por == id_usuario) ? await Comentario.findByIdAndUpdate(id, data, { new: true })
        : res.status(401).json({ msg: 'Error: modificacion de comentario solo posible por usuario que lo creo' });

    res.status(202).json({

        msg: 'Actualizacion realizada con exito',
        comentarioPut
    });

};


const comentarioDeleteAnime = async (req, res = response) => {

    const { id } = req.params;

    const { anime } = await Comentario.findByIdAndDelete(id);

    await Anime.findByIdAndUpdate(anime, { $pull: { 'comentarios': id } }, { new: true });

    res.json({
        msg: `El comentario con el id: ${id} ha sido borrado correctamente`
    });

};

const comentarioDeleteManga = async (req, res = response) => {

    const { id } = req.params;

    const { manga } = await Comentario.findByIdAndUpdate(id);

    await Manga.findByIdAndUpdate(manga, { $pull: { 'comentarios': id } }, { new: true });

    res.json({
        msg: `El comentario con el id: ${id} ha sido borrado correctamente`
    });

};

module.exports = {
    crearComentarioAnime,
    crearComentarioManga,
    comentariosGet,
    comentarioGet,
    comentarioPut,
    comentarioDeleteAnime,
    comentarioDeleteManga
};