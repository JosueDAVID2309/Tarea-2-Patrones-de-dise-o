const repUser = require('../repositories/userRepository')

exports.login = async (req, res) =>{
    const email = req.body.email;
    const user = await repUser.buscarUser(email);
    req.session.UserId = user.id;
    res.render('inicio', {
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.username,
        f_nacimiento: user.f_nacimiento,
        correo: user.email,
        genero: user.genero === 'M' ? 'Hombre': 'Mujer'
    });
    console.log(user);
}

exports.registro = async (req, res) =>{
    const user = await repUser.createUser(req.body.nombre, req.body.apellido,
        req.body.usuario, req.body.f_nacimiento, 
        req.body.correo, req.body.clave, req.body.genero
    );

    req.session.UserId = user;
    res.render('inicio', {
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.username,
        f_nacimiento: user.f_nacimiento,
        correo: user.email,
        genero: user.genero === 'M' ? 'Hombre': 'Mujer'
    });
    console.log(req.session.UserId);
}