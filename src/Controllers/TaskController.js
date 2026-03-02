const repTask = require('../repositories/taskRepository')

exports.nuevaTarea = async (req, res, next) => {
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

    res.redirect('/login')
}