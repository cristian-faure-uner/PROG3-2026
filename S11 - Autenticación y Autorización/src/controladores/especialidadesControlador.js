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
                    'mensaje': 'Especialidades encontradas.',
                    'especialidades': especialidades
                }
            );

        }catch(error) {
            console.log(`Error en GET /especialidades ${error}`);            
            res.status(500).json({
                'estado': false,
                'mensaje': 'Error interno'
            })    
        }
    }

    buscarPorId = async(req, res) => {
        try{
            const id_especialidad = req.params.id_especialidad;
            const especialidad = await this.especialidades.buscarPorId(id_especialidad);
            
            if(especialidad.length === 0){
                return res.status(404).json({
                    estado: false, 
                    mensaje: 'Especialidad no encontrada.'
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'Especialidad encontrada.',
                especialidad: especialidad
            });

        }catch(error){
            console.log(`Error en GET /especialidades/:id_especialidad ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }

    crear = async (req, res) => {
        try{            
            const { nombre } = req.body;

            const especialidad = {
                nombre: nombre
            }

            const nuevaEspecialidad = await this.especialidades.crear(especialidad);

            if(!nuevaEspecialidad || nuevaEspecialidad.length === 0){
                //400 fallos de logica de negocio
                return res.status(400).json({
                    estado: false, 
                    mensaje: 'No se pudo crear la especialidad.'
                });
            }

            return res.status(201).json({
                estado: true,
                mensaje: 'Especialidad creada.',
                especialidad: nuevaEspecialidad
            });

        }catch(error){
            console.log(`Error en POST /especialidades ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }

    modificar = async (req, res) => {
        try{            
            const id_especialidad = req.params.id_especialidad;
            const { nombre } = req.body;

            const especialidad = {
                nombre: nombre
            }

            const especialidadModificada = await this.especialidades.modificar(id_especialidad, especialidad);
            
            if(especialidadModificada === null){
                return res.status(404).json({
                    estado: false, 
                    mensaje: 'Especialidad no encontrada.',
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'Especialidad modificada.',
                especialidad: especialidadModificada
            });

        }catch(error){
            console.log(`Error en PUT /especialidades/:id_especialidad ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }

    eliminar = async(req, res) => {
        try{
            const id_especialidad = req.params.id_especialidad;
            const especialidad = await this.especialidades.eliminar(id_especialidad);
            
            if(especialidad === null){
                return res.status(404).json({
                    estado: false, 
                    mensaje: 'Especialidad no encontrada.'
                });
            }
            // 204 No Content, la respuesta no tiene cuerpo, solo se indica que la operación fue exitosa
            return res.status(204).send();

            // opcionalmente se puede devolver un mensaje indicando que la especialidad fue eliminada, aunque no es necesario
            // return res.status(200).json({
            //     estado: true,
            //     mensaje: 'Especialidad eliminada.',
            //     especialidad: []
            // });

        }catch(error){
            console.log(`Error en GET /especialidades/:id_especialidad ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }
}