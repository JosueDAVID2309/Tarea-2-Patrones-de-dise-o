const repUser = require('../repositories/userRepository')

exports.login = async (req, res) =>{
    const email = req.body.email;
    req.session.UserId = await repUser.buscarUser(email);
    res.send(`Felicidades ingresastes ${req.session.UserId}`)
    
}

exports.registro = (req, res) =>{
    
}