import multer from 'multer';
// CONFIGURACIÓN COMO MULTER ALMACENARA LOS ARCHIVOS SUBIDOS POR EL CLIENTE.

const storage = multer.diskStorage({ 

    destination: function (req, file, cb) {       

        cb(null, './src/publico');

    },
    filename: function (req, file, cb)  {

        cb(null, file.originalname ); 

    }
})

export {storage}