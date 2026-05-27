import { pool } from "./conexion.js";

export default class TurnosReservas {

    crear = async (turnoReserva) => {
        const {id_medico, id_paciente, id_obra_social, fecha_hora, valor_total} = turnoReserva;
        const sql = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total)
             VALUES (?,?,?,?,?)`;
        const [result] = await pool.execute(sql, [id_medico,id_paciente,id_obra_social,fecha_hora, valor_total ]);     
        if (result.affectedRows === 0){
            return null;
        }
        return result.insertId;
    }
}