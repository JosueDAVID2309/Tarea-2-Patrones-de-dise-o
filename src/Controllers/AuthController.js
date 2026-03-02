const repUser = require('../repositories/userRepository')
const repTasks = require('../repositories/taskRepository');
const userService = require('../service/userService')

exports.login = async (req, res) =>{
    const user = req.user; 
    const tasks = await repTasks.obtenerTareas();
    
    console.log("Se inicio sesion")
    console.log(req.session.UserId)

    res.render('inicio', {
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.username,
        f_nacimiento: userService.formatearFecha(user.f_nacimiento),
        correo: user.email,
        genero: user.genero === 'M' ? 'Hombre': 'Mujer',
        tareas: tasks
    });

}

exports.registro = async (req, res) =>{
    const user = await repUser.createUser(req.body.nombre, req.body.apellido,
        req.body.usuario, req.body.f_nacimiento, 
        req.body.correo, req.body.clave, req.body.genero
    );

    const tasks = await repTasks.obtenerTareas();
    req.session.UserId = user;
    res.render('inicio', {
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.username,
        f_nacimiento: userService.formatearFecha(user.f_nacimiento),
        correo: user.email,
        genero: user.genero === 'M' ? 'Hombre': 'Mujer',
        tareas: tasks
    });

    console.log(req.session.UserId)
}

exports.mostrarInicio = async (req, res, next) => {
    try {
        console.log(req.session.UserId)
        const user = await repUser.buscarPorId(req.session.UserId);
        const tasks = await repTasks.obtenerTareas();
        console.log(req.session.UserId)
        res.render('inicio', {
            nombre: user.nombre,
            apellido: user.apellido,
            usuario: user.username,
            f_nacimiento: userService.formatearFecha(user.f_nacimiento),
            correo: user.email,
            genero: user.genero === 'M' ? 'Hombre': 'Mujer',
            tareas: tasks
        });

    } catch (error) {
        next(error);
    }
};