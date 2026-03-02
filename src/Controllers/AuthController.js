const repUser = require('../repositories/userRepository')

exports.login = async (req, res) =>{
    const email = req.body.email;
    req.session.UserId = await repUser.buscarUser(email);
    console.log(req.session.UserId)
    res.send(`Felicidades ingresastes ${req.session.UserId.id}`)
    
}

exports.registro = async (req, res) =>{
    const user = await repUser.createUser(req.body.nombre, req.body.apellido,
        req.body.usuario, req.body.f_nacimiento, 
        req.body.correo, req.body.clave, req.body.genero
    );

    req.session.UserId = user;
    res.send(`Felicidades ingresastes ${req.session.UserId}`)

}