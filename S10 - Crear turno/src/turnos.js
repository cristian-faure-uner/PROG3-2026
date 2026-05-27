import express from "express";
import fs from "fs";
import morgan from "morgan";

import { router as v1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicosRutas.js";
import { router as v1TrunosReservas } from "./rutas/v1/turnosReservasRutas.js";

import { testConexion } from "./db/testConexion.js"

const app = express();

await testConexion();

let log = fs.createWriteStream('./accesos.log', { 
    flags: 'a'
});

app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({'estado': true, 'msg': 'API OK'});
})

app.use('/api/v1/especialidades', v1EspecialidadesRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/medicos', v1MedicosRutas);
app.use('/api/v1/turnos-reservas', v1TrunosReservas);


export default app;