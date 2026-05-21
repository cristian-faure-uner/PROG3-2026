export default class ObrasSocialesRespuestaDTO {

    constructor(objeto){
        this.id_obra_social = objeto.id_obra_social
        this.nombre = objeto.nombre
        this.descripcion = objeto.descripcion
        this.porcentaje_descuento = objeto.porcentaje_descuento
    }

}