import ObrasSociales from "../db/obrasSociales.js"
import ObrasSocialesRespuestaDTO from "../dtos/obrasSocialesRespuestaDTO.js";

export default class ObrasSocialesServicio {

    constructor(){
        this.obrasSociales = new ObrasSociales();
    }

    buscarTodas = async () => {
        const datos = await this.obrasSociales.buscarTodas();    
        return datos.map(row => new ObrasSocialesRespuestaDTO(row));
    }

    buscarPorId = async (idObraSocial) => {
        return this.obrasSociales.buscarPorId(idObraSocial);        
    }

    modificar = async (idObraSocial, obraSocial) => {
        
        const existe = await this.obrasSociales.buscarPorId(idObraSocial);
        if(existe.length === 0) {
            return null;
        }
        
        const modificada = await this.obrasSociales.modificar(idObraSocial, obraSocial);
        return this.buscarPorId(modificada);
    }

    crear = async (obraSocial) => {
        const nuevo_id = await this.obrasSociales.crear(obraSocial);
        return this.buscarPorId(nuevo_id);
    }

    eliminar = async (idObraSocial) => {
        const existe = await this.obrasSociales.buscarPorId(idObraSocial);
        if(existe.length === 0) {
            return null;
        }
        return this.obrasSociales.eliminar(idObraSocial);
    }
}