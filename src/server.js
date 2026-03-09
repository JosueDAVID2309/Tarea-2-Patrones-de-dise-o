require('dotenv').config();
require('ejs'); 
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const Routes = require('./Routes/web');


//Express settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(morgan("dev"));

app.use(session({
    secret: 'mi_secreto_super_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

//rutas
app.use(Routes);



app.listen(3000, () =>{
    console.log(`Servidor en el puerto ${4000}`);
})