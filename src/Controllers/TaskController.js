const repTask = require('../repositories/taskRepository')

exports.nuevaTarea = async (req, res, next) => {
    console.log(`userID =  ${req.session.UserId}`)
    try {
        const { titulo, contenido } = req.body;

        await repTask.crearTarea(
            titulo,
            contenido,
            req.session.UserId,
            false
        );
        res.redirect('/inicio');

    } catch (error) {
        next(error);
    }
}

exports.eliminarTarea = (req, res) => {
    const idTarea = req.params.id;
    repTask.eliminarTarea(idTarea)
    console.log('tarea eliminada')
    console.log(`userID =  ${req.session.UserId}`)
    res.redirect('/inicio');
}

exports.editarTarea =(req, res) => {
    const idTarea = req.params.id;
    repTask.editarTarea(idTarea, req.body.titulo, req.body.contenido)
    console.log('tarea editada')
    console.log(`userID =  ${req.session.UserId}`)
    res.redirect('/inicio');
}