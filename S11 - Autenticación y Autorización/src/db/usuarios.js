import { pool } from "./conexion.js";

export default class Usuarios {

    buscarPorId = async(id_usuario) => {
        const sql = `SELECT * FROM usuarios WHERE id_usuario = ?`;
        const [usuario] = await pool.execute(sql, [id_usuario]);
        return usuario[0];
    }

    buscar = async (email, contrasenia) => {
        const sql = `SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido) as usuario, u.rol
                        FROM usuarios  AS u
                        WHERE u.email = ? 
                            AND u.contrasenia = SHA2(?, 256) 
                            AND u.activo = 1;`
        const [result] = await pool.execute(sql, [email, contrasenia]);
        return result[0];
    }
}