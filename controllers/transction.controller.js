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
  },
  getAllTransactions : async function (data){
    try {
      const transction = await Transction.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $unwind: '$product',
        },
        {
          $project: {
            _id: 1,
            paymentId: 1,
            productPrice: 1,
            paymentStatus: 1,
            paymentType: 1,
            cd: 1,
            'user.email': 1,
            'user.full_name': 1,
            'user.role': 1,
            'product.productImage': 1,
            'product.productName': 1,
            'product.productPrice': 1,
            'product.productDescription': 1,
          },
        }
      ])
      return transction;
    } catch (error) {
      console.log("error--", error);
      return false;
    }
  }
};
