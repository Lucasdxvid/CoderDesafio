//! Tenemos este OBJETO el cual tenemos EVITAR que las claves se repitan (Por ejemplo hay 2 objetos y ambos repiten las KEYs manzanas)

const objetos = [
  //Podemos observar que este array tiene una dificultad (Tiene 1 nivel de ANIDAMIENTO (2 objetos))
  {
    manzanas: 3,
    peras: 2,
    carne: 1,
    jugos: 5,
    dulces: 2,
  }, // Suma de 13 de values
  {
    manzanas: 1,
    sandias: 1,
    huevos: 6,
    jugos: 1,
    panes: 4,
  }, // Suma de 13 de values
];

let arregloResultante = [];
let total = 0;

//! El primer ejercicio solo nos devuelve los KEYS, no los valores (DEVUELVE UN ARRAY al hacer el object.keys con las claves)
//! El segundo ejercicio necesitamos obtener y sumar los VALUES por aparte
objetos.forEach((objetos) => {
  //forEach ejecuta la función indicada una vez por cada elemento del array (como si estuviera mapeando esos elementos)

  const keys = Object.keys(objetos);
  const values = Object.values(objetos);
  console.log(values);

  //! Aqui abajo colocamos += ya que sumamamos los dos objetos que posee el array (los dos 13 que estan anidados)
  total += values.reduce(
    (valorInicial, valorAcumulado) => valorAcumulado + valorInicial
  ); // El método reduce() ejecuta una función reductora (significa reducir el array insertado a un solo valor, Esta reducción se da a partir de una función reduce Javascript que insertamos como parámetro) sobre cada (continua)
  // (continua) elemento de un array, devolviendo como resultado un único valor.

  //Includes determina si un array posee X elemento / valor, devolviendo un true o false
  keys.forEach((key) => {
    if (!arregloResultante.includes(key)) arregloResultante.push(key); //La validacion es para que no se repitan elementos (Si el array posee X elemento, no lo incluye (repetido))
  });
});

// El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.

console.log(arregloResultante);
console.log(total);
