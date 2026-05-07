import express  from 'express';
import EspecialidadesControlador from "../../controladores/especialidadesControlador.js";

const router = express.Router();

const especialidadesControlador = new EspecialidadesControlador();

router.get('/', especialidadesControlador.buscarTodas);

export { router };