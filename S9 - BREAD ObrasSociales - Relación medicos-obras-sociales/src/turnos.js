import express from "express";

import { router as v1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicosRutas.js";

import { testConexion } from "./db/testConexion.js"

const app = express();

await testConexion();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({'estado': true, 'msg': 'API OK'});
})

app.use('/api/v1/especialidades', v1EspecialidadesRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/medicos', v1MedicosRutas);


process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3005, () => {
    console.log(`servidor iniciado OK en puerto ${PUERTO}`);
})