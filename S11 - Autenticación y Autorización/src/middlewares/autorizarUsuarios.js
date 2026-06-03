export default function autorizarUsuarios ( perfilAutorizados = [] ) {

    return (req, res, next) => {

        const usuario = req.user;
        
        if(!usuario || !perfilAutorizados.includes(usuario.rol)) {
            return res.status(403).json({
                'estado':false,
                'mensaje':'Acceso Denegado'
            }) 
        }

        next();
    }
}