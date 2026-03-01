const userRep = require('../repositories/userRepository')

exports.autenticarUser = async (req, res, next) =>{
    const user = await userRep.verificarUser(req.body.email, req.body.clave);

    if(user)
        return next();

    res.render('login',{
        error: 'Correo u contraseña incorrectas'
    })
}