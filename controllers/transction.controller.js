const ObjectId = require('mongodb').ObjectId;
const Transction = require("../models/transction.model");
const mongoose = require("mongoose");

module.exports = {
  createTransction: async function (data) {
    try {
      const transction = new Transction({
        userId:  new mongoose.Types.ObjectId(data.userId),
        productId:  new mongoose.Types.ObjectId(data.productId),
        paymentId: data.paymentId,
        productPrice: data.productPrice,
        paymentStatus: data.paymentStatus,
        paymentType: data.paymentType,
        cd: new Date(),
      });
      await transction.save();
      return transction;
    } catch (error) {
      console.log("error--", error);
      return false;
    }
  }
};
