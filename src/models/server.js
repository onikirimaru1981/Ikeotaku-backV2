
const express = require('express');
var cors = require('cors');
const { dbConnection, } = require('../database/config');
const fileUpload = require('express-fileupload');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {

            animes: '/api/anime',
            auth: '/api/auth',
            buscar: '/api/buscar',
            comentarios: '/api/comentario',
            // generos: '/api/genero',
            mangas: '/api/manga',
            // uploads: '/api/img',
            usuarios: '/api/usuario',
        };

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    };

    async conectarDB() {
        await dbConnection();

    };

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo de body

        this.app.use(express.json())

        // Directorio publivo
        this.app.use(express.static('public'))

        // Carga de archivos express-fileupload

        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: true
        // }));
    };

    routes() {                   // Middleware condicional

        this.app.use(this.paths.animes, require('../routes/animes.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.comentarios, require('../routes/comentarios.routes'))
        // this.app.use(this.paths.generos, require('../routes/auth.routes'))
        this.app.use(this.paths.mangas, require('../routes/mangas.routes'));
        // this.app.use(this.paths.uploads, require('../routes/auth.routes'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
    };

    // Configuracion puerto del servidor

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Todo bien en el puerto: ${'http://localhost:'.red} ${this.port.yellow}`.green);
        });
    };
};

module.exports = Server;