import express  from 'express';
import multer from 'multer';

import TransformarDTO from '../../middlewares/transformarDTOs.js';
import { check, param } from 'express-validator';
import UsuariosControlador from '../../controladores/usuariosControladores.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { storage } from '../../config/multer.js';

const upload = multer({ storage });
const transformarDTO = new TransformarDTO();
const router = express.Router();
const usuariosControlador = new UsuariosControlador();

router.put('/:id_usuario',
    [
        param('id_usuario', 'El parámetro debe ser entero').isInt(),
        check('documento')
            .optional(),
        check('apellido')
            .optional(),
        check('nombres')
            .optional(),
        check('email')
            .optional(),
        check('contrasenia')
            .optional(),
        check('foto_path')
            .optional(),
        check('rol')
            .optional(),    
        validarCampos
    ],
    upload.single('foto'),
    transformarDTO.usuariosActualizarDTO,
    usuariosControlador.modificar);


export { router };