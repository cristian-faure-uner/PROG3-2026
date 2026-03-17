let frutas = ['peras', 'manzana', 'naranja'] ;
console.log(frutas);

let temas = new Array(5);
console.log(temas);

let multiple = [100, 'algo', true,  {nombre:'Pedro', edad:40}];
console.log(multiple);

let alumnos = new Array('Luis', 'Pedro', 'Lucas');
console.log(alumnos);
console.log(alumnos.length);


// RECORRER
for(let i=0; i < alumnos.length; i++){
    console.log(alumnos[i]);
}

for( let alumno of alumnos){
    console.log(alumno);
}

alumnos.forEach(function(alumno, indice){
    console.log(` El alumno ${alumno} está ubicado en la posición ${indice}`);
})


// METODOS COMUNES
console.log(alumnos);
alumnos.push('Marcos'); // AGREGAR UNO O MAS ELEMENTOS AL FINAL
console.log(alumnos);

const quitado = alumnos.pop(); // ELIMINAR Y RETORNAR EL ULTIMO ELEMENTO
console.log(alumnos);
console.log(quitado);

const quitado2 = alumnos.shift(); //AGREGAR UN ELEMENTO AL INICIO DEL ARRAY
console.log(alumnos);
console.log(quitado2);


alumnos.unshift(quitado2); // AGERGAR UNO O MAS ELEMENTOS AL INICIO DEL ARRAY
console.log(alumnos);

const alumnos2 = alumnos.slice(); // REOTORNA UNA COPIA SUPERFICIAL DE UNA PORCION DEL ARRAY EN UN NUEVO ARRAY, EN CASO DE MODIFICAR NO MODIFICA EL ORIGINAL

alumnos.push('Carlos');
alumnos2.push('Alfredo');

console.log(alumnos);
console.log(alumnos2);




// METODOS AVANZADOS

let alumnos = [
    {nombre: 'Carlos', edad: 47},
    {nombre: 'Marcos', edad: 19},
    {nombre: 'Luis', edad: 40},
    {nombre: 'Jose', edad: 25}
];
console.log(alumnos);

// CREA UN NUEVO ARRAY CON TODOS LOS ELEMENTOS QUE PASEN LA PRUEBA 
let alumnosMayore20 = alumnos.filter( alumno => alumno.edad > 20);
console.log(alumnosMayore20);

// CREA UN NUEVO ARRAY CON LOS RESULTADOS DE LLAMAR A UNA FUNCION PARA ELEMENTO DEL ARRAY
let alumnosNombre = alumnos.map( alumno => alumno.nombre);
console.log(alumnosNombre);

// RETORNA EL PRIMER ELEMENTO QUE PASA LA PRUEBA
let primer = alumnos.find(alumno => alumno.edad > 20);
console.log(primer);

// RETORNA EL INDICE DEL PRIMER ELEMENTO QUE PASA LA PRUEBA.
let posicion = alumnos.findIndex(alumno => alumno.edad > 20);
console.log(posicion);