import express from "express";
import ProductManager from "./managers/ProductManager.js"; //? Añadir el .JS porque sino no funciona

//! Creacion de servidor HTTP con "Express"
const app = express();

//! Creacion de nueva instancia de la clase
const manager = new ProductManager("./files/Products.json");

//! Soporte de datos

app.use(express.urlencoded({ extended: true }));

//! Obtencion de productos (Limitar productos con limit="numero")
app.get("/products", async (req, res) => {
  // Definimos el valor limit y lo parseamos ya que solo recibe STRINGS
  const limit = parseInt(req.query.limit);

  // Obtenemos todos los productos
  const allProducts = await manager.getProducts();

  // Aplicamos un limite de productos a mostrar y en caso contrario mostramos todos
  const products = limit ? allProducts.slice(0, limit) : allProducts;

  res.send(products);
});

//! Buscar producto por ID en un path param

app.get("/products/:pid", async (req, res) => {
  // Transformamos el path param de nuestro req param en numero
  const userId = Number(req.params.pid);

  res.send(await manager.getProductById(userId));
});

//! Puerto a escuchar para levantar el servidor

app.listen(8080, () => console.log("Listening on 8080"));
