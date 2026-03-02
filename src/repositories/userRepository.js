const db = require('../config/database');

exports.createUser = async (
    nombre,
    apellido,
    username,
    f_nacimiento,
    email,
    password,
    genero
) => {
    const [result] = await db.query(
        'INSERT INTO usuarios (nombre, apellido, username, f_nacimiento, email, password, genero) VALUES (?,?,?,?,?,?,?)',
        [nombre, apellido, username, f_nacimiento, email, password, genero]
    );

    return result.insertId;
};

exports.verificarUser = async (email, password) => {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE email = ? AND password = ?',
        [email, password]
    );

    return rows[0] || null;
};

exports.buscarUser = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );

    return rows[0] || null;
};

