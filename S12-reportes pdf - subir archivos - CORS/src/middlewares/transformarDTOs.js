export default class TransformarDTO {
    obrasSocialesCrearDTO = async (req, res, next) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

        req.dto = {
            nombre: nombre.trim().toUpperCase(),
            descripcion: descripcion.trim(),
            porcentaje_descuento,
            es_particular
        };

        next();
    }

    obrasSocialesActualizarDTO = async (req, res, next) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
        const dto = {};

        if (nombre !== undefined) dto.nombre = nombre.trim().toUpperCase();
        if (descripcion !== undefined) dto.descripcion = descripcion.trim();
        if (porcentaje_descuento !== undefined) dto.porcentaje_descuento = porcentaje_descuento;
        if (es_particular !== undefined) dto.es_particular = es_particular;

        req.dto = dto;
        next();
    }

    medicosAsociarDTO = async (req, res, next) => {
        const { id_medico } = req.params;
        const { obras_sociales } = req.body;

        req.dto = {
            id_medico,
            obras_sociales
        };

        next();
    }

    turnosReservasCrearDTO = async (req, res, next) => {
        const { id_medico, id_paciente, fecha_hora } = req.body;

        req.dto = {
            id_medico,
            id_paciente,
            fecha_hora
        };

        next();
    }

    usuariosActualizarDTO = async (req, res, next) => {
        const { documento, apellido, nombres, email, contrasenia, rol , activo } = req.body;
        const dto = {};

        if (documento !== undefined) dto.documento = documento;
        if (apellido !== undefined) dto.apellido = apellido;
        if (nombres !== undefined) dto.nombres = nombres;
        if (email !== undefined) dto.email = email;
        if (contrasenia !== undefined) dto.contrasenia = contrasenia;
        if (rol !== undefined) dto.rol = rol;
        if (activo !== undefined) dto.activo = activo;

        if (req.file) {
            dto.foto_path = req.file.filename;
        }

        req.dto = dto;
        next();
    }
}