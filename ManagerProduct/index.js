const { ProductManager } = require("./managers/ProductManager"); // Importamos con require para traer tambien las clases que utilizamos en el otro archivo js

const manager = new ProductManager("./files/Products.json"); // Creamos la instancia de la clase para acceder al los metodos de esa CLASS

const env = async () => {
  const product = {
    nombre: "Lucas",
    apellido: "Paz",
    edad: 20,
    curso: "Backend",
  };

  await manager.addProduct(product); // Usamos el custom metodo addProduct para pushear el objeto a nuestro array

  const finalProducts = await manager.getProducts(); // EL metodo es asincrono por lo que usamos el wait
  console.log(finalProducts);
};

env();
