import express  from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

import TransformarDTO from '../../middlewares/transformarDTOs.js';
import ObrasSocialesControlador from '../../controladores/obrasSocialesControlador.js';

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();
const transformarDTO = new TransformarDTO();

router.get('/',  obrasSocialesControlador.buscarTodas);

router.get('/:id_obra_social', 
    [
        param('id_obra_social', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ],
    obrasSocialesControlador.buscarPorId
);

router.post('/', 
    [
        check('nombre')
            .notEmpty().withMessage('El nombre es obligatorio.')
            .isLength({max:120}).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
        check('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria.')
            .isLength({max:120}).withMessage('La descripción no debe ser mayor a 120 caracteres.'),
        check('porcentaje_descuento')
            .notEmpty().withMessage('El porcentaje_descuento es obligatorio.'),
        check('es_particular')
            .notEmpty().withMessage('El es_particular es obligatorio.'),
        validarCampos
    ], 
    transformarDTO.obrasSocialesCrearDTO,
    obrasSocialesControlador.crear);

router.put('/:id_obra_social',
    [
        param('id_obra_social', 'El parámetro debe ser entero').isInt(),
        check('nombre')
            .optional()
            .notEmpty().withMessage('El nombre no puede estar vacío.')
            .isLength({max:120}).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
        check('descripcion')
            .optional()
            .notEmpty().withMessage('La descripción no puede estar vacía.')
            .isString().withMessage('La descripción debe ser cádena de caracteres.')
            .isLength({max:120}).withMessage('La descripción no debe ser mayor a 120 caracteres.'),
        check('porcentaje_descuento')
            .optional()
            .isNumeric().withMessage('El porcentaje_descuento debe ser numérico.'),
        check('es_particular')
            .optional()
            .isBoolean().withMessage('es_particular debe ser verdadero o falso.'),
        validarCampos
    ],
    transformarDTO.obrasSocialesActualizarDTO,
    obrasSocialesControlador.modificar);

router.delete('/:id_obra_social', 
    [
        param('id_obra_social', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ],
    obrasSocialesControlador.eliminar);

export { router };