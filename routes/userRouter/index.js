var express = require("express");
var router = express.Router();
let config = require("../../config/jwtConfig");
let tokenConfig = require("../../config/token");
let jwt = require("jsonwebtoken");
let userController = require("../../controllers/user.controller");
const passport = require("passport");
require("../../config/passport")(passport);

router.post("/register", async function (req, res, next) {
  if (!req.body.email || !req.body.full_name || !req.body.password) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  let findUser = await userController.findUserByEmail(req.body.email);
  if (findUser) {
    return res.status(422).json({ error: "User Alredy register" });
  }
  let createUser = await userController.doRegistation(req.body);
  if (createUser) {
    res.status(200).json({
      status: 200,
      data: { createUser },
      message: "User Created Successfully....",
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

router.post("/login", async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  let loginUser = await userController.doLogin(req.body);
  if (loginUser) {
    let token = jwt.sign(loginUser.toJSON(), config.secret, {
      expiresIn: "24h",
    });
    res.status(200).json({
      status: 200,
      data: { loginUser, token: "JWT " + token },
      message: "User Login Successfully....",
      error: false,
    });
  } else {
    res.status(404).json({
      status: 404,
      data: {},
      message: "Incorrect email or Password...!",
      error: false,
    });
  }
});
3;
//   });

module.exports = router;
