import TurnosReservas from "../servicios/turnosReservasServicio.js";

export default class TurnosReservasControlador {

    constructor() {
        this.turnosReservas = new TurnosReservas();
    }

    crear = async (req, res) => {
        try{            
            const turnoReserva = req.dto;

            const nuevoTurnoReserva = await this.turnosReservas.crear(turnoReserva);
            
            if(!nuevoTurnoReserva || nuevoTurnoReserva.length === 0){
                return res.status(400).json({
                    estado: false, 
                    mensaje: 'No se pudo crear el turno.'
                });
            }

            return res.status(201).json({
                estado: true,
                mensaje: 'Turno Creado.',
                datos: nuevoTurnoReserva
            });

        }catch(error){
            console.log(`Error en POST /turnos-reservas ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }
}