jest.mock('../src/repositories/taskRepository')

const taskController = require('../src/Controllers/TaskController')
const repTask = require('../src/repositories/taskRepository')

//Crear Tarea
test("Deberia crear una nueva tarea", async () => {

    repTask.crearTarea.mockResolvedValue({ id: 1 });

    const req = {
        body: {
            titulo: "Nueva Tarea",
            contenido: "Contenido",
            id: 1,
            estado: false
        },
        session: {
            UserId: 1
        }
    };

    const res = {
        redirect: jest.fn()
    };

    await taskController.nuevaTarea(req, res);

    expect(repTask.crearTarea).toHaveBeenCalledWith(
        "Nueva Tarea",
        "Contenido",
        1,
        false
    );

    expect(res.redirect).toHaveBeenCalledWith("/inicio");

});

//Eliminar Tarea
test("Deberia eliminar una tarea", async () => {

    repTask.eliminarTarea.mockResolvedValue(true);

    const req = {
        params: {
            id: 5
        },
        session: {
            UserId: 1
        }
    };

    const res = {
        redirect: jest.fn()
    };

    await taskController.eliminarTarea(req, res);

    expect(repTask.eliminarTarea).toHaveBeenCalledWith(5);

    expect(res.redirect).toHaveBeenCalledWith('/inicio');

});

//Editar Tarea
test("Deberia editar una tarea", async () => {

    repTask.editarTarea.mockResolvedValue(true);

    const req = {
        params: {
            id: 3
        },
        body: {
            titulo: "Titulo actualizado",
            contenido: "Contenido actualizado"
        },
        session: {
            UserId: 1
        }
    };

    const res = {
        redirect: jest.fn()
    };

    await taskController.editarTarea(req, res);

    expect(repTask.editarTarea).toHaveBeenCalledWith(
        3,
        "Titulo actualizado",
        "Contenido actualizado"
    );

    expect(res.redirect).toHaveBeenCalledWith('/inicio');

});