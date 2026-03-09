const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const TaskController = require('../Controllers/TaskController');
const authUser = require('../middlewares/authUser');
const taskRep = require('../repositories/taskRepository');

router.get('/', (req, res) => {res.redirect('/login')});

router.get('/login', (req, res) =>{res.render('login', {error: null })})
router.get('/registro', (req, res) => { res.render('registro') });

router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

router.post('/login', authUser.autenticarUser, AuthController.login);
router.post('/registro', AuthController.registro);

router.get('/post' , (req, res) => {
    res.render('inicio');
})

router.get('/logout', AuthController.logout)

router.post('/postear', authUser.verificarSesion, TaskController.nuevaTarea)
router.post('/tarea/delete/:id', TaskController.eliminarTarea)
router.post('/tarea/edit/:id', TaskController.editarTarea);

router.get('/tareas', async (req, res) => {
    const tasks = await taskRep.obtenerTareas();
    res.render('test', {
        tareas: tasks
    })
})

router.get('/tarea/:id', async (req, res) => {
    const tarea = await taskRep.buscarTarea(req.params.id)
    console.log(tarea.id)
    res.render('partials/editTasks', {
        id: tarea.id,
        titulo: tarea.titulo,
        contenido: tarea.contenido
    });
})



router.get('/inicio', authUser.verificarSesion, AuthController.mostrarInicio);


module.exports = router;