import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalSrategy } from "passport-local";

import UsuariosServicio from "../servicios/usuariosServicio.js";

const estrategia = new LocalSrategy({
    usernameField: 'email', 
    passwordField: 'contrasenia'
}, 
    async (email, contrasenia, done) => {
        try{
            const usuariosServicio = new UsuariosServicio(); 
            const usuario = await usuariosServicio.buscar(email, contrasenia);
            if(!usuario){
                return done(null, false, { estado: false, mensaje: 'Login incorrecto!'})
            }
            return done(null, usuario, {estado: true, mensaje: 'Login correcto!'})
        }
        catch(exc){
            done(exc);
        }
    }
)

const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET    
},
    async (jwtPayload, done) => { 
        const usuariosServicio = new UsuariosServicio();
        const usuario = await usuariosServicio.buscarPorId(jwtPayload.id_usuario);
        if(!usuario){
            return done(null, false, { mensaje: 'Token incorrecto!'});
        }

        return done(null, usuario);
    }    
)
export { estrategia, validacion };