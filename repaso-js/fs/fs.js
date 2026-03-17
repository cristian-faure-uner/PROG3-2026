const fs = require('fs');
// console.log(fs);
// const prog = fs.readFileSync('./programa.txt', 'utf-8');
// console.log(prog);

const nuevaLinea = '5. SQL';
fs.appendFileSync('./programa2.txt', nuevaLinea);

console.log(fs.readFileSync('./programa2.txt', 'utf-8'));

fs.unlinkSync('./programa2.txt');