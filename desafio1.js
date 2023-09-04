class ProductManager {
  #iva = 0.21;

  constructor() {
    this.products = [];
  }

  addProduct = (title, description, price, stock = 5, code = 10) => {
    const product = {
      title,
      description,
      price: price + price * this.#iva,
      stock,
      code,
    };

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);
  };

  findProductById = (id) => {
    return this.products.find((product) => product.id === id);
  };

  getProducts = () => {
    return this.products;
  };
}

const handleEvents = new ProductManager();

handleEvents.addProduct(
  "Samsung Galaxy A32",
  "SmarthPhone de gama media",
  200000,
  30,
  10
);

handleEvents.addProduct(
  "GigaByte Aorus AP750GM",
  "Fuente de alimentacion de 750w",
  80000,
  13,
  11
);

console.log(handleEvents.getProducts()); // Mostrar todos los productos

const productById = handleEvents.findProductById(5); // Buscar producto por ID
if (productById) {
  console.log("Producto encontrado por ID:", productById);
} else {
  console.log("Producto no encontrado");
}
