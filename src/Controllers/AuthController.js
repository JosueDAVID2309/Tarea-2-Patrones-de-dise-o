const repUser = require('../repositories/userRepository')
const repTasks = require('../repositories/taskRepository');
const userService = require('../service/userService')

exports.login = async (req, res) =>{
    const user = req.user; 
    const tasks = await repTasks.obtenerTareas();

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
    const userT = await repUser.buscarPorId(user);

    const tasks = await repTasks.obtenerTareas();
    req.session.UserId = user;

    res.render('inicio', {
        nombre: userT.nombre,
        apellido: userT.apellido,
        usuario: userT.username,
        f_nacimiento: userService.formatearFecha(userT.f_nacimiento),
        correo: userT.email,
        genero: userT.genero === 'M' ? 'Hombre': 'Mujer',
        tareas: tasks
    });
}

exports.mostrarInicio = async (req, res) => {
    const user = await repUser.buscarPorId(req.session.UserId);
    const tasks = await repTasks.obtenerTareas();
    res.render('inicio', {
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.username,
        f_nacimiento: userService.formatearFecha(user.f_nacimiento),
        correo: user.email,
        genero: user.genero === 'M' ? 'Hombre': 'Mujer',
        tareas: tasks
    });

};

exports.logout = (req, res) => {
    req.session.destroy(function(err){
        if (err) {
            console.error(err);
            return res.status(500).send('No se pudo cerrar sesión');
        }
    })
    res.clearCookie('connect.sid');
    res.redirect('/');
}