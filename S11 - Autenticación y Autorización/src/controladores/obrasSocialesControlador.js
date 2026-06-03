import ObrasSociales from "../servicios/obrasSocialesServicio.js";

export default class ObrasSocialesControlador {

    constructor() {
        this.obrasSociales = new ObrasSociales();
    }

    buscarTodas = async (req, res) => {
        try{
            const obrasSociales = await this.obrasSociales.buscarTodas();

            res.status(200).json(
                {
                    'estado': true, 
                    'mensaje': 'Obras Sociales encontradas.',
                    'datos': obrasSociales
                }
            );
        }catch(error) {
            console.log(`Error en GET /obras-sociales ${error}`);            
            res.status(500).json({
                'estado': false,
                'mensaje': 'Error interno'
            })    
        }
    }

    buscarPorId = async(req, res) => {
        try{
            const idObraSocial = req.params.id_obra_social;
            const obraSocial = await this.obrasSociales.buscarPorId(idObraSocial);
            
            if(obraSocial.length === 0){
                return res.status(404).json({
                    estado: false, 
                    mensaje: 'Obra Social no encontrada.'
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'Obra Social encontrada.',
                datos: obraSocial
            });
        }catch(error){
            console.log(`Error en GET /obras-sociales/:id_obra_social ${error}`);
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
            const obraSocial = req.dto;

            const nuevaObraSocial = await this.obrasSociales.crear(obraSocial);

            if(!nuevaObraSocial || nuevaObraSocial.length === 0){
                return res.status(400).json({
                    estado: false, 
                    mensaje: 'No se pudo crear la obra social.'
                });
            }

            return res.status(201).json({
                estado: true,
                mensaje: 'Obra Social creada.',
                datos: nuevaObraSocial
            });

        }catch(error){
            console.log(`Error en POST /obras-sociales ${error}`);
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
            const idObraSocial = req.params.id_obra_social;
            const obraSocial = req.dto;

            if (Object.keys(obraSocial).length === 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No se recibieron los datos de la Obra Social para modificar.'
                });
            }

            const obraSocialModificada = await this.obrasSociales.modificar(idObraSocial, obraSocial);
            
            if(obraSocialModificada === null){
                return res.status(404).json({
                    estado: false, 
                    mensaje: 'Obra Social no encontrada.',
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'Obra Social modificada.',
                datos: obraSocialModificada
            });

        }catch(error){
            console.log(`Error en PUT /obras-sociales/:id_obra_social ${error}`);
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
            const idObraSocial = req.params.id_obra_social;
            const obraSocial = await this.obrasSociales.eliminar(idObraSocial);
            
            if(obraSocial === null){
                return res.status(404).json({
                    estado: false, 
                    mensaje: 'Obra Social no encontrada.'
                });
            }
            // 204 No Content, la respuesta no tiene cuerpo, solo se indica que la operación fue exitosa
            return res.status(204).send();

        }catch(error){
            console.log(`Error en PUT /obras-sociales/:id_obra_social ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }
}