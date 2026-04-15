// console.log('prog3');
import express from "express";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(`test get`);

    // res.status(404).send({'estado':'ok', 'msg': 'API OK'});
    res.send({'estado':'ok', 'msg': 'API OK'});
    
})

app.post('/especialidades', (req, res) => {
    res.send({'estado':'ok', 'msg': 'Creado'});
})

process.loadEnvFile();
const PUERTO = process.env.PUERTO;


app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado OK en puerto ${PUERTO}`);
})