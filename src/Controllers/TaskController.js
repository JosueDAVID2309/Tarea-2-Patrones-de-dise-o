const repTask = require('../repositories/taskRepository')

exports.nuevaTarea = async (req, res) => {
    
    const { titulo, contenido } = req.body;

    await repTask.crearTarea(
        titulo,
        contenido,
        req.session.UserId,
        false
    );
    res.redirect('/inicio');

    
}

exports.eliminarTarea = (req, res) => {
    const idTarea = req.params.id;
    repTask.eliminarTarea(idTarea)
    res.redirect('/inicio');
}

exports.editarTarea =(req, res) => {
    const idTarea = req.params.id;
    repTask.editarTarea(idTarea, req.body.titulo, req.body.contenido)
    res.redirect('/inicio');
}