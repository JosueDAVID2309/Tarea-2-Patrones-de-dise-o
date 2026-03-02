const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const TaskController = require('../Controllers/TaskController');
const authUser = require('../middlewares/authUser');
const taskRep = require('../repositories/taskRepository');

router.get('/', (req, res) =>{res.render('login', {error: null })})
router.get('/registro', (req, res) => { res.render('registro') });

router.all('/login', authUser.autenticarUser ,AuthController.login);

router.get('/post' , (req, res) => {
    res.render('inicio');
})

router.post('/postear', authUser.verificarSesion, TaskController.nuevaTarea)
router.post('/tarea/delete/:id', TaskController.eliminarTarea)

router.get('/tareas', async (req, res) => {
    const tasks = await taskRep.obtenerTareas();
    res.render('test', {
        tareas: tasks
    })
})

module.exports = router;