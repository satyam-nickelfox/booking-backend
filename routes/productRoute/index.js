require("dotenv").config();
var express = require("express");
var router = express.Router();
const secret_key = process.env.STRIPE_SECRET_KEY;
const react_domain = process.env.REACT_DOMAIN;
const stripe = require("stripe")(secret_key);
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
router.post("/create-checkout-session", async function (req, res, next) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: "inr",
            product_data: {
              name: req.body.productName,
            },
            unit_amount: req.body.productPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${react_domain}user/product/success`,
      cancel_url: `${react_domain}user/product/fail`,
    });
    res.status(200).json({
      status: 200,
      data: { session },
      message: "checkout success....",
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: { error },
      message: "Something went wrong....",
      error: true,
    });
  }
  //   let listProduct = await productController.listProduct();
  //   if (listProduct) {
  //     res.status(200).json({
  //       status: 200,
  //       data: { listProduct },
  //       message: "Product finds Successfully....",
  //       error: false,
  //     });
  //   } else {
  //     res.status(404).json({
  //       status: 404,
  //       data: {},
  //       message: "Something Went Wrong..",
  //       error: false,
  //     });
  //   }
});

module.exports = router;
