const mongoose = require("mongoose");

const transctionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  paymentId: {
    type: String,
  },
  productPrice: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  cd: {
    type: String,
  },
});

// model
mongoose.model("transction", transctionSchema);

// modeule exports
module.exports = mongoose.model("transction");
