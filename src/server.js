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

//rutas
app.use(Routes);



app.listen(3000, () =>{
    console.log(`Servidor en el puerto ${3000}`);
})