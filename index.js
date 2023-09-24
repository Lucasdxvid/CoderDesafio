import { Express } from "express";
const { ProductManager } = require("./managers/ProductManager");

//! Creacion de nueva instancia de la clase
const manager = new ProductManager("./files/Products.json");

const handleMethods = async () => {
  //! Agregar productos (Campos: Nombre - Descripcion - Imagen URL - Precio - Stock - Codigo)

  await manager.addProduct(
    "GigaByte Aorus AP750GM", // Nombre o Titulo del producto
    "Fuente de alimentacion de 750w", // Descripcion
    "https://images.com/photos/Gigabyte.jpg", // Imagen URL
    80000, // Precio
    13, // Stock
    4 // Codigo
  );

  //! Buscar producto por ID (Colocar ID a buscar en "productIdToFind")

  const productIdToFind = 1;

  const productFound = await manager.getProductById(productIdToFind);

  if (productFound) {
    console.log("Producto encontrado:", productFound);
  }

  //! Consologeo de todos los Productos existentes

  console.log("Lista de productos:", await manager.getProducts());
};

handleMethods(); // Llamada de la funcion encargada de manejar los custom metodos de nuestra clase "ProductManager"
