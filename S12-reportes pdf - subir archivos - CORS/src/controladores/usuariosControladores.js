import UsuariosServicio from "../servicios/usuariosServicio.js";

export default class UsuariosControlador{

    constructor(){
        this.usuariosServicio = new UsuariosServicio();
    }
    
    modificar = async (req, res) => {
        try {
            const id_usuario = req.params.id_usuario;

            const modificado = await this.usuariosServicio.modificar(id_usuario, req.dto);

            if (!modificado) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Usuario no encontrado para ser modificado.'
                })
            }

             res.status(200).json(
                {
                    'estado': true, 
                    'mensaje': 'Usuario modificado.',
                    'datos': modificado
                }
            );
    
        } catch (err) {
            console.log('Error en PUT /usuarios/:usuario_id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }
}