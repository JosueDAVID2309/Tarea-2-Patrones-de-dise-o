const express = require('express');
const router = express.Router();
const HomeController = require('../Controllers/HomeController');
const AuthController = require('../Controllers/AuthController');
const authUser = require('../middlewares/authUser');


router.get('/', (req, res) =>{
    res.render('login', {error: null });
    })
router.get('/registro', (req, res) => {
    res.render('registro')
})
router.post('/login', authUser.autenticarUser ,AuthController.login);
router.post('/registro', AuthController.registro);

router.get('/post', (req, res) => {
    res.render('inicio');
})

module.exports = router;