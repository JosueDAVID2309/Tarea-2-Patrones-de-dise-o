const express = require('express');
const router = express.Router();
const HomeController = require('../Controllers/HomeController');
const AuthController = require('../Controllers/AuthController');
router.get('/', HomeController.index);

router.post('/login', AuthController.login);
router.get('/registro', (req, res) => {
    res.render('registro')
})

router.get('/post', (req, res) => {
    res.render('inicio');
})

module.exports = router;