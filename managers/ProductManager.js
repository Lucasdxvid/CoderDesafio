//! Obtencion del modulo FileSystem

import fs from "fs";

//! Clase ProductManager encargada de crear / verificar existencias de productos

export default class ProductManager {
  //Definimos el IVA a partir de una variable privada
  #iva = 0.21;

  constructor(path) {
    this.path = path;
  }

  // Creamos un metodo el cual formatea el precio (Añade punto y coma) por medio de REGEX (Expresiones regulares)

  formatPrice = (price) => {
    const parts = price.toFixed(2).split(".");
    const formattedPrice = `$${parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    )},${parts[1]}`;
    return formattedPrice;
  };

  //! Obtencion y Parseo de productos ya existentes

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return []; // Si no existe retornamos un array vacio
      }
    } catch (error) {
      console.error(error);
    }
  };

  //! "Molde" para añadir/crear nuevos productos

  addProduct = async (title, description, thumbnail, price, stock, code) => {
    try {
      const products = await this.getProducts(); // Obtencion de productos ya existentes del JSON (Parseado)

      // Verifica que los valores ingresados en stock / price sean siempre números
      if (isNaN(price) || isNaN(stock)) {
        console.error(
          "El precio y el stock deben ser números válidos (No escribas letras!)."
        );
        return;
      }

      // Verifica que si el "CODE" ya existe en X producto
      const codeExists = products.some(
        (product) => product.code === "AA-PROD-" + code
      );

      if (codeExists) {
        console.error(
          `El código ${code} ya está en uso por otro producto (Intenta ingresar otro código).`
        );
        return; // El producto no se agrega al array si ya existe
      }

      const product = {
        id: products.length === 0 ? 1 : products[products.length - 1].id + 1,
        title,
        description,
        thumbnail,
        price: this.formatPrice(price + price * this.#iva), // Precio ya formateado
        stock,
        code: "AA-PROD-" + code,
      };

      products.push(product); // Pusheamos el nuevo producto al array

      //! Transformacion de array a cadena de texto (STRING)

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      return product;
    } catch (error) {
      console.error(error);
    }
  };

  //! Metodo encargado de buscar productos acorde a su ID

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);

      if (!product) {
        console.log(`Producto con ID ${id} no encontrado.`);
        return null;
      } else {
        console.log(`Producto con ID ${id} fue encontrado con exito.`);
        return product;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}