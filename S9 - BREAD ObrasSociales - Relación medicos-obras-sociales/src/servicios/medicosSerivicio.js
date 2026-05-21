import Medicos from "../db/medicos.js"
import MedicosRespuestaDTO from "../dtos/medicosRespuestaDTO.js";

export default class MedicosServicio {

    constructor(){
        this.medicos = new Medicos();
    }

    buscarTodos = async () => {
        const datos = await this.medicos.buscarTodos(); 
        // uso el DTO de respuesta           
        return datos.map(row => new MedicosRespuestaDTO(row));
    }

    asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
        return this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
    }
}