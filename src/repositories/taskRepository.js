//repository partten tareas
const db = require('../config/database');

exports.obtenerTareas = async (filtros = {}) => {
    let query = 'SELECT * FROM tareas WHERE 1=1';
    const params = [];

    if (filtros.userId) {
        query += ' AND user_id = ?';
        params.push(filtros.userId);
    }

    if (filtros.estado) {
        query += ' AND estado = ?';
        params.push(filtros.estado);
    }

    const [rows] = await db.query(query, params);
    return rows;
};

exports.buscarTarea = async (id) =>{
    const [rows] = await db.query('SELECT * FROM tareas WHERE id = ?', [id]);
    return rows[0] || null;
}

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