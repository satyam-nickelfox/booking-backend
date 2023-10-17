const Product = require("../models/product.model");

module.exports = {
  createProduct: async function (data) {
    try {
      const product = new Product({
        productImage: data.productImage,
        productName: data.productName,
        productPrice: data.productPrice,
        productDescription: data.productDescription,
        cd: new Date(),
      });
      await product.save();
      return product;
    } catch (error) {
      console.log("error--", error);
      return false;
    }
  },
  listProduct: async function () {
    try {
      const product = await Product.find({});
      return product;
    } catch (error) {
      console.log("error--", error);
      return false;
    }
  },
};
