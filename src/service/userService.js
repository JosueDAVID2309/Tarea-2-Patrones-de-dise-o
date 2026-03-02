
exports.formatearFecha = (fecha) => {
    const date = new Date(fecha);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
    const anio = date.getFullYear();

    return `${dia}-${mes}-${anio}`;
}

exports.formatearhora = (fecha) => {
    const date = new Date(fecha);

    const hora = String(date.getHours());
    const min = String(date.getMinutes());

    return `${hora}:${min}`;
}