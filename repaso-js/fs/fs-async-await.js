const fs = require('fs').promises;

const agregarPersonaje = async (p) => {


    const datos = await fs.readFile('./personajes.json', 'utf-8');
    //console.log(datos);
    const personajes = JSON.parse(datos);
    console.log(personajes);
    // console.log(p);

    personajes.push(p);

    const algo = JSON.stringify(personajes);
    // await fs.writeFile('./personajes.json', algo);
}


p1 = {
        "id": 8,
        "nombre": "Robert Baratheon"
    }

agregarPersonaje(p1);