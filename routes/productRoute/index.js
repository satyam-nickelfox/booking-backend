require("dotenv").config();
var express = require("express");
var router = express.Router();
const secret_key = process.env.STRIPE_SECRET_KEY;
const react_domain = process.env.REACT_DOMAIN;
const stripe = require("stripe")(secret_key);
let productController = require("../../controllers/product.controller");
const passport = require("passport");
require("../../config/passport")(passport);
const endpointSecret = process.env.END_POINT_SECRET;

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

router.post(
  "/create-checkout-session",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      console.log("req-----------", req.user);
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
  }
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    console.log("webhookj here");
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log("error", err);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    // switch (event.type) {
    //   case "checkout.session.async_payment_failed":
    //     const checkoutSessionAsyncPaymentFailed = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.async_payment_failed
    //     break;
    //   case "checkout.session.async_payment_succeeded":
    //     const checkoutSessionAsyncPaymentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.async_payment_succeeded
    //     break;
    //   case "checkout.session.completed":
    //     const checkoutSessionCompleted = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.completed
    //     break;
    //   case "checkout.session.expired":
    //     const checkoutSessionExpired = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.expired
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    console.log("event.data.object", event.data.object);
    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

module.exports = router;
