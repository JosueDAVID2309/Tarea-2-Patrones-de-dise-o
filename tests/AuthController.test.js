jest.mock('../src/repositories/userRepository')
jest.mock('../src/repositories/taskRepository')
jest.mock('../src/service/userService')

const controller = require('../src/Controllers/AuthController')

const repUser = require('../src/repositories/userRepository')
const repTasks = require('../src/repositories/taskRepository')
const userService = require('../src/service/userService')

test("Deberia renderizar inicio cuando el usuario inicia sesion", async () => {

    const mockUser = {
        nombre: "Juan",
        apellido: "Perez",
        username: "juan123",
        f_nacimiento: "2000-01-01",
        email: "juan@mail.com",
        genero: "M"
    };

    repTasks.obtenerTareas.mockResolvedValue([]);
    userService.formatearFecha.mockReturnValue("01/01/1999");

    const req = {
        user: mockUser,
        session: { UserId: 1 }
    };

    const res = {
        render: jest.fn()
    };

    await controller.login(req, res);

    expect(repTasks.obtenerTareas).toHaveBeenCalled();

    expect(res.render).toHaveBeenCalledWith('inicio', {
        nombre: "Juan",
        apellido: "Perez",
        usuario: "juan123",
        f_nacimiento: "01/01/1999",
        correo: "juan@mail.com",
        genero: "Hombre",
        tareas: []
    });

});

test("Deberia registrar un usuario nuevo", async () => {

    repUser.createUser.mockResolvedValue(1);

    repUser.buscarPorId.mockResolvedValue({
        nombre: "Ana",
        apellido: "Lopez",
        username: "ana123",
        f_nacimiento: "1999-05-10",
        email: "ana@mail.com",
        genero: "F"
    });

    repTasks.obtenerTareas.mockResolvedValue([]);

    userService.formatearFecha.mockReturnValue("10/05/1999");

    const req = {
        body: {
            nombre: "Ana",
            apellido: "Lopez",
            usuario: "ana123",
            f_nacimiento: "1999-05-10",
            correo: "ana@mail.com",
            clave: "123",
            genero: "F"
        },
        session: {}
    };

    const res = {
        render: jest.fn()
    };

    await controller.registro(req, res);

    expect(repUser.createUser).toHaveBeenCalled();

    expect(repUser.buscarPorId).toHaveBeenCalledWith(1);

    expect(repTasks.obtenerTareas).toHaveBeenCalled();

    expect(req.session.UserId).toBe(1);

    expect(res.render).toHaveBeenCalled();

});

test("Deberia mostrar inicio para usuario logueado", async () => {

    repUser.buscarPorId.mockResolvedValue({
        nombre: "Carlos",
        apellido: "Diaz",
        username: "carlos123",
        f_nacimiento: "1995-02-01",
        email: "carlos@mail.com",
        genero: "M"
    });

    repTasks.obtenerTareas.mockResolvedValue([]);

    userService.formatearFecha.mockReturnValue("01/02/1995");

    const req = {
        session: { UserId: 2 }
    };

    const res = {
        render: jest.fn()
    };

    await controller.mostrarInicio(req, res);

    expect(repUser.buscarPorId).toHaveBeenCalledWith(2);

    expect(repTasks.obtenerTareas).toHaveBeenCalled();

    expect(res.render).toHaveBeenCalled();

});

test("Deberia cerrar sesion correctamente", () => {

    const req = {
        session: {
            destroy: jest.fn((cb) => cb(null))
        }
    };

    const res = {
        clearCookie: jest.fn(),
        redirect: jest.fn()
    };

    controller.logout(req, res);

    expect(req.session.destroy).toHaveBeenCalled();

    expect(res.clearCookie).toHaveBeenCalledWith('connect.sid');

    expect(res.redirect).toHaveBeenCalledWith('/');

});