exports.index = (req , res) => {
    res.render('login');    
}

exports.login = (req, res) =>{
    const [email, correo] = req.body;
}