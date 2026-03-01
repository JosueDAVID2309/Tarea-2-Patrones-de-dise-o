const db = require('../config/database');

exports.obtenerTareas = async (filters = {}) => {
    let query = 'SELECT * FROM tareas WHERE 1=1';
    const params = [];

    if (filters.userId) {
        query += ' AND user_id = ?';
        params.push(filters.userId);
    }

    if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
    }

    const [rows] = await db.query(query, params);
    return rows;
};

exports.crearTarea = async (titulo, contenido, id_usuario, estado) => {
    const [result] = await db.query(
        'INSERT INTO tareas (titulo, contenido, id_usuario, estado) VALUES (?, ?, ?, ?)',
        [titulo, contenido, id_usuario, estado]
    );

    return result.insertId;
};

exports.editarTarea = async (id, tituto, contenido, estado) => {
    const [result] = await db.query(
        'UPDATE tareas SET titulo = ?, contenido = ?, estado = ? WHERE id = ?',
        [tituto, contenido, estado, id]
    );

    return result.affectedRows > 0;
};

exports.eliminarTarea = async (id) => {
    const [result] = await db.query(
        'DELETE FROM tareas WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};