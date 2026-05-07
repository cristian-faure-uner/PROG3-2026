import Especialidades from "../db/especialidades.js"

export default class EspecialidadesServicio {

    constructor(){
        this.especialidades = new Especialidades();
    }

    buscarTodas = () => {
        return this.especialidades.buscarTodas();    
    }
}