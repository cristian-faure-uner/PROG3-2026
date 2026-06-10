import { pool } from "./conexion.js";

export default class ObrasSociales {

    buscarTodas = async () => {
        const sql = "SELECT * FROM obras_sociales WHERE activo = 1";        
        const [obrasSociales] = await pool.query(sql);
        return obrasSociales;
    }

    buscarPorId = async(idObraSocial) => {
        const sql = `SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?`;
        const [obraSocial] = await pool.execute(sql, [idObraSocial]);
        return obraSocial[0];
    }

    crear = async(obraSocial) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = obraSocial;
        const sql = 'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?,?,?,?)';
        const [result] = await pool.execute(sql, [nombre, descripcion, porcentaje_descuento, es_particular]);
        
        if (result.affectedRows === 0){
            return null;
        }
        return result.insertId;
    }
    
    modificar = async(idObraSocial, obraSocial) => {
        const updates = [];
        const values = [];

        if (obraSocial.nombre !== undefined) {
            updates.push('nombre = ?');
            values.push(obraSocial.nombre);
        }
        if (obraSocial.descripcion !== undefined) {
            updates.push('descripcion = ?');
            values.push(obraSocial.descripcion);
        }
        if (obraSocial.porcentaje_descuento !== undefined) {
            updates.push('porcentaje_descuento = ?');
            values.push(obraSocial.porcentaje_descuento);
        }
        if (obraSocial.es_particular !== undefined) {
            updates.push('es_particular = ?');
            values.push(obraSocial.es_particular);
        }

        if (updates.length === 0) {
            return null;
        }

        const sql = `UPDATE obras_sociales SET ${updates.join(', ')} WHERE id_obra_social = ?`;
        values.push(idObraSocial);

        const [result] = await pool.execute(sql, values);
        if (result.affectedRows === 0){
            return null;
        }
        return idObraSocial;
    }
    
    eliminar  = async(idObraSocial) => {
        const sql = 'UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?';
        const [result] = await pool.execute(sql, [idObraSocial]);
        if (result.affectedRows === 0){
            return null;
        }
        return true;
    }
}