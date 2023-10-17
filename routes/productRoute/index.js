var express = require("express");
var router = express.Router();

let productController = require("../../controllers/product.controller");

router.post("/addproduct", async function (req, res, next) {
  if (
    !req.body.productImage ||
    !req.body.productName ||
    !req.body.productPrice ||
    !req.body.productDescription
  ) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  let createProduct = await productController.createProduct(req.body);
  if (createProduct) {
    res.status(200).json({
      status: 200,
      data: { createProduct },
      message: "Product Created Successfully....",
      error: false,
    });
  } else {
    res.status(404).json({
      status: 404,
      data: {},
      message: "Something Went Wrong..",
      error: false,
    });
  }
});
router.get("/productlist", async function (req, res, next) {
  let listProduct = await productController.listProduct();
  if (listProduct) {
    res.status(200).json({
      status: 200,
      data: { listProduct },
      message: "Product finds Successfully....",
      error: false,
    });
  } else {
    res.status(404).json({
      status: 404,
      data: {},
      message: "Something Went Wrong..",
      error: false,
    });
  }
});

module.exports = router;
