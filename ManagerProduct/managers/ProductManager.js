const fs = require("fs");

class ProductManager {
  #iva = 0.21;

  constructor(path) {
    this.path = path;
  }

  formatPrice = (price) => {
    const parts = price.toFixed(2).split(".");
    const formattedPrice = `$${parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    )},${parts[1]}`;
    return formattedPrice;
  };

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addProduct = async (title, description, thumbnail, price, stock, code) => {
    try {
      const products = await this.getProducts();

      // Verifica si los valores ingresados en stock / price sean siempre números
      if (isNaN(price) || isNaN(stock)) {
        console.error(
          "El precio y el stock deben ser números válidos (No escribas letras!)."
        );
        return;
      }

      // Verifica si el código ya existe en algún producto
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
        price: this.formatPrice(price + price * this.#iva),
        stock,
        code: "AA-PROD-" + code,
      };

      products.push(product);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      return product;
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = {
  ProductManager,
};
