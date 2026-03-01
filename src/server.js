require('dotenv').config();
require('ejs'); 
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const Routes = require('./Routes/web');

//Express settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"));

app.use(Routes);

//Generar clave token:
//node
//require('crypto').randomBytes(64).toString('hex')

const hoy = new Date();
const fecha = hoy.getFullYear() + '-' +
              String(hoy.getMonth() ) + '-' +
              String(hoy.getDate());

console.log(fecha)

app.listen(3000, () =>{
    console.log(`Servidor en el puerto ${3000}`);
})