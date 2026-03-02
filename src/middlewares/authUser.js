const userRep = require('../repositories/userRepository')

exports.autenticarUser = async (req, res, next) => {
    try {
        const user = await userRep.verificarUser(
            req.body.email,
            req.body.clave
        );

        if (!user) {
            return res.render('login', {
                error: 'Correo u contraseña incorrectas'
            });
        }

        req.session.regenerate(err => {
            if (err) return next(err);

            req.session.UserId = user.id;
            req.user = user; 
            console.log('filtro superado');
            next();
        });

    } catch (error) {
        next(error);
    }
};

exports.verificarSesion = (req, res, next) => {
    
    if (!req.session.UserId) {
        return res.redirect('/login');
    }
    console.log('filtro superado');
    console.log(`userID =  ${req.session.UserId}`)
    next();
}