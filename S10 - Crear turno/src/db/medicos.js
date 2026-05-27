import { pool } from "./conexion.js";

export default class Medicos {

    buscarTodos = async () => {
        const sql = "SELECT * FROM v_medicos";        
        const [medicos] = await pool.execute(sql);
        return medicos;
    }

    buscarPorId = async(id_medico) => {
        const sql = `SELECT * FROM medicos WHERE id_medico = ?`;
        const [medico] = await pool.execute(sql, [id_medico]);
        return medico[0];
    }

    relacionarConObraSocial = async (id_medico, obras_sociales) => {

        const conexion = await pool.getConnection();

        try{
            await conexion.beginTransaction();
            
            for(const os of obras_sociales){
                const sql = `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?);`
                await conexion.execute(sql, [id_medico, os.id_obra_social]);
            }   

            await conexion.commit();
            await conexion.release();

            return true;
        }catch(error) {
            await conexion.rollback();
            await conexion.release();
            // console.log(error );
            return false;
        }

    }
}