// console.log('prog3');
import express from "express";
import { pool } from "./db/conexion.js";
import { testConexion } from "./db/test-conexion.js"

const app = express();

// TEST BASE DE DATOS
await testConexion();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(`test get`);

    // res.status(404).send({'estado':'ok', 'msg': 'API OK'});
    res.send({'estado':'ok', 'msg': 'API OK'});
    
})

// FALTA IMPLEMENTAR
app.post('/especialidades', (req, res) => {
    res.send({'estado':'ok', 'msg': 'Creado'});
})

// RETORNA TODAS LAS ESPECIALIDADES
// CONSULTA SIMPLES
app.get('/especialidades', async (req, res) => {

    try{
        const sql = "SELECT * FROM especialidades WHERE activo = 1";        
        const [especialidades, fields] = await pool.query(sql);

        console.log(fields); // METADATOS DE LA BASE DE DATOS

        res.status(200).send(
            {
                'estado':'ok', 
                'especialidades': especialidades
            }
        );

    }catch(error) {
        console.log(error);
    }
});

// RETORNA UNA ESPECIALIDAD SEGÚN EL ID QUE VIENE COMO PARAMETRO
// UTILIZAMOS CONSULTAS PARAMETRIZADAS - CONSULTAS PREPARADAS
app.get('/especialidades/:id_especialidades', async (req, res) => {

    try{
        const ccc = req.params.id_especialidades;
        const sql = `SELECT * FROM especialidades WHERE activo = ? AND id_especialidad = ?`;

        const [especialidades, fields] = await pool.execute(sql, [ccc]);

        console.log(fields);

        res.status(200).send(
            {
                'estado':'ok', 
                'especialidades': especialidades
            }
        );

    }catch(error) {
        console.log(error);
    }

})

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado OK en puerto ${PUERTO}`);
})