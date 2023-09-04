//Definicion de variables que almacenan datos
const uName = ["Juan Ramirez"];
let uAge = [22];
const uPrice = 9.99;
const uMoviesAndSeries = ["Euphoria", "Breaking Bad", "From"];

//Mostrar valores en consola
console.log("Nombre: ", uName);
console.log("Edad: ", uAge);
console.log("Precio: ", uPrice);
console.log("Series y Películas: ", uMoviesAndSeries);

//Sumar valor a la edad
uAge++; //! Añade +1

//Agregar una serie a la lista
const newMovie = "Beau is Afraid";
uMoviesAndSeries.push(newMovie); //! Añade uno o más elementos al final de un array y devuelve la nueva longitud del array

//Mostrar valores actualizados
console.log("Edad incrementada: ", uAge);
console.log("Seires y Películas añadidas: ", uMoviesAndSeries);
