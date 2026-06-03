import express  from 'express';
import apicache from 'apicache';
import { check, param } from 'express-validator';
import {validarCampos} from '../../middlewares/validarCampos.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';
import EspecialidadesControlador from "../../controladores/especialidadesControlador.js";

const router = express.Router();

const cache = apicache.middleware;

const especialidadesControlador = new EspecialidadesControlador();

router.get('/', autorizarUsuarios([2,3]), cache('5 minutes'), especialidadesControlador.buscarTodas);

router.get('/:id_especialidad', 
    [
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ],
    especialidadesControlador.buscarPorId);

router.post('/', 
    [
        check('nombre')
            .notEmpty().withMessage('El nombre es obligatorio.')
            .isLength({max:120}).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
        validarCampos
    ], 
    especialidadesControlador.crear);

router.put('/:id_especialidad', 
    [
        check('nombre')
            .notEmpty().withMessage('El nombre es obligatorio.')
            .isLength({max:120}).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ],
    especialidadesControlador.modificar);

router.delete('/:id_especialidad', 
    [
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ],
    especialidadesControlador.eliminar);

export { router };