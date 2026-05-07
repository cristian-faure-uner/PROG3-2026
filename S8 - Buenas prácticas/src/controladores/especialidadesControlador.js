import EspecialidadesServicio from "../servicios/especialidadesServicio.js";

export default class EspecialidadesControlador {

    constructor() {
        this.especialidades = new EspecialidadesServicio();
    }

    buscarTodas = async (req, res) => {
        try{
            const especialidades = await this.especialidades.buscarTodas();

            res.status(200).json(
                {
                    'estado': true, 
                    'especialidades': especialidades
                }
            );

        }catch(error) {
            console.log(`Error en GET /especialidades ${error}`);            
            res.status(500).json({
                'estado': false,
                'msg': 'Error interno'
            })    
        }
    }
}