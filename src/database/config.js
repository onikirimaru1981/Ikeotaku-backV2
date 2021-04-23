// Conexion de mongoose con DB

const mongoose = require('mongoose');
require('colors');

//  conexion DB

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online'.green);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos'.red);

    };

};


module.exports = {
    dbConnection
};