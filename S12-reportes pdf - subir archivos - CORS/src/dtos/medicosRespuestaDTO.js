export default class MedicosRespuestaDTO {

    constructor(objeto){
        this.id_medico = objeto.id_medico
        this.id_usuario = objeto.id_usuario
        this.apellido = objeto.apellido
        this.nombres = objeto.nombres
        this.email = objeto.email
        this.foto_path = objeto.foto_path
    }

}