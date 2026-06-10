import express from "express";
import fs from "fs";
import morgan from "morgan";
import passport from "passport";
import cors from "cors";

import { estrategia, validacion} from './config/passport.js';

import { router as v1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicosRutas.js";
import { router as v1TurnosReservas } from "./rutas/v1/turnosReservasRutas.js";
import { router as v1Usuarios } from "./rutas/v1/usuariosRutas.js";
import { router as v1AuthRutas} from "./rutas/v1/authRutas.js"

import { testConexion } from "./db/testConexion.js"

const app = express();
await testConexion();

app.use(cors());
app.use(express.json());

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

let log = fs.createWriteStream('./accesos.log', { 
    flags: 'a'
});

app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

app.get('/', (req, res) => {
    res.status(200).send({'estado': true, 'msg': 'API OK'});
})

app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/medicos', v1MedicosRutas);

// RUTAS QUE NECESITAN AUTORIZACIÓN
app.use('/api/v1/especialidades', passport.authenticate('jwt', {session:false}), v1EspecialidadesRutas);

// app.use('/api/v1/turnos-reservas', passport.authenticate('jwt', {session:false}), v1TurnosReservas);
app.use('/api/v1/turnos-reservas',  v1TurnosReservas);

// app.use('/api/v1/usuarios', passport.authenticate('jwt', {session:false}), v1Usuarios);
app.use('/api/v1/usuarios', v1Usuarios);

app.use('/api/v1/auth', v1AuthRutas);


export default app;