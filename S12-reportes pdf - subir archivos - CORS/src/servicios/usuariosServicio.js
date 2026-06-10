import Usuarios from "../db/usuarios.js";

export default class UsuariosServicio {

    constructor(){
        this.usuarios = new Usuarios();
    }

    buscarPorId = (id_usuario) => {
        return this.usuarios.buscarPorId(id_usuario);
    }

    buscar = (email, contrasenia) => {
        return this.usuarios.buscar(email, contrasenia);
    }

    modificar = async (id_usuario, datos) => {
        const existe = this.usuarios.buscarPorId(id_usuario);
        if(!existe){
            return null;
        }
        return this.usuarios.modificar(id_usuario, datos);
    }
}