import app from './turnos.js';

process.loadEnvFile();

app.listen(process.env.PUERTO || 3005, () => {
    console.log(`servidor iniciado OK en puerto ${process.env.PUERTO}`);
})