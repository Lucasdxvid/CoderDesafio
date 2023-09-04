class ProductManager {
  //Definimos el IVA a partir de una variable privada
  #iva = 0.21;

  constructor() {
    this.products = [];
  }

  //Creamos el "molde" para añadir nuevos productos
  addProduct = (title, description, thumbnail, price, stock = 5, code = 10) => {
    const product = {
      title,
      description,
      thumbnail,
      price: price + price * this.#iva,
      stock,
      code: "AA-PROD-" + code,
    };

    // Verifica si el código ya existe en algún producto
    const codeExists = this.products.some(
      (product) => product.code === "AA-PROD-" + code
    );

    if (codeExists) {
      console.error(
        `El código ${code} ya está en uso por otro producto (Intenta ingresar otro código).`
      );
      return; // El producto no se agrega al array si ya existe
    }

    //Verifica el ultimo elemento del array y autoincrementña +1 la ID si agregamos un nuevo producto
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);
  };

  //Verificamos si cierta ID existe buscandola por medio de este metodo
  findProductById = (id) => {
    const productId = this.products.find((product) => product.id === id);

    if (productId) {
      console.log(`El producto con el ID: ${id} existe`);
    } else {
      console.error(`ID: ${id} not found`);
    }
  };

  // Obtenemos todos los productos para luego ser mostrados
  getProducts = () => {
    return this.products;
  };
}

//! Creacion de nueva instancia  de nuestra clase "ProductManager"
const handleEvents = new ProductManager();

//! Uso de METODOS luego de crear una nueva instancia

handleEvents.addProduct(
  "Samsung Galaxy A32",
  "SmarthPhone de gama media",
  "https://images.com/photos/SamsungA32.jpg",
  200000,
  30,
  6
); // Crear un producto

handleEvents.addProduct(
  "GigaByte Aorus AP750GM",
  "Fuente de alimentacion de 750w",
  "https://images.com/photos/Gigabyte.jpg",
  80000,
  13,
  5
); // Crear un producto

handleEvents.addProduct(
  "Nvidia RTX 3060 12 Gb",
  "Placa de video de la familia NVIDIA",
  "https://images.com/photos/RTX3060.jpg",
  380000,
  18,
  5
); // Crear un producto

console.log(handleEvents.getProducts()); // Mostrar todos los productos

handleEvents.findProductById(0); // Buscar producto por ID
