import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
const app = express();

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

//Conectar la base de dato

db.authenticate()
    .then (( ) => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el year actual
app.use((req, res, next) =>{
    
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";

    next();
});

//Agregar body parser para leer los datos del form
app.use(express.urlencoded({extended: true}))

//Definir la carpeta pubclir
app.use(express.static('public'))

//Agregar router
app.use('/', router)

app.listen(port,host, () =>{
    console.log(`El Servidor esta funcionando en el puerto ${port} y host ${host}`)
})