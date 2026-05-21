import MedicosServicio from "../servicios/medicosSerivicio.js";

export default class MedicosControlador {

    constructor() {
        this.medicos = new MedicosServicio();
    }

    buscarTodos = async (req, res) => {
        try{
            const medicos = await this.medicos.buscarTodos();

            res.status(200).json(
                {
                    'estado': true, 
                    'mensaje': 'Médicos encontrados.',
                    'medicos': medicos
                }
            );

        }catch(error) {
            console.log(`Error en GET /medicos ${error}`);            
            res.status(500).json({
                'estado': false,
                'mensaje': 'Error interno'
            })    
        }
    }

    asociarMedicoObrasSociales = async (req, res) => {
        try{            
            
            const {id_medico, obras_sociales} = req.dto;

            const relacion = await this.medicos.asociarMedicoObrasSociales(id_medico, obras_sociales);

            if(!relacion){
                return res.status(400).json({
                    'estado': false,
                    'mensaje': 'No se crearon las relaciones'
                })  
            }

            return res.status(201).json({
                estado:'ok',
                mensaje:'Médico y obras sociales relacionadas'    
            });

        }catch(error){
            console.log(`Error en POST /medicos/obras-sociales ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }
}