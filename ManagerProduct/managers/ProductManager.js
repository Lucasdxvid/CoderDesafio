const fs = require("fs"); // Usamos el modulo fileSystem para hacer CRUD

class ProductManager {
  // Nuestro constructor posee "path" x las rutas que pasaremos como parametro del directorio del archivo que crearemos
  constructor(path) {
    this.path = path;
  }

  //! Obtenemos los usuarios del archivo Usuarios.json con este custom metodo
  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        //en el caso que exista voy a leer su contenido
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data); // Parseamos la info que recibimos de la data (lo pasamos de cadena de texto string a array)
        return products; // Retornamos el array de usuarios
      } else {
        return []; // Si no existe retornamos un array vacio
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! Creamos usuarios y los pusheamos en nuestro Usuarios.json con este custom metodo
  addProduct = async (product) => {
    try {
      //? Array de objetos traidos de Usuarios.json
      const products = await this.getProducts(); // Obtenemos TODOS los usuarios que ya tenemos almacenado hasta el momento en Usuarios.json

      //? ID AUTOINCREMENTABLE
      if (products.length === 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1; // [] sigfinica que accedemos al ultimo elemento
      }

      //insertamos el elemento o product
      products.push(product);

      //Una vez pusheado transformamos los mismos en una cadena de texto con "Stringify"
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      ); // El segundo parametro es NULL porque significa que no utilizamos ese parametro y el tercero es un tabulador o salto de linea

      return product;
    } catch (error) {
      console.log(error);
    }
  };
}

//! Exportaciones similar a export default, etc.

module.exports = {
  ProductManager,
};
