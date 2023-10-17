const mongoose = require('mongoose');

const productSchema =mongoose.Schema({
    productImage : {
        type :String,
    },
    productName : {
        type :String,
    },
    productPrice : {
        type :String,
    },
    productDescription : {
        type :String,
    },
    cd : {
        type :String,
    }
 
});

// model
mongoose.model('product', productSchema);

// modeule exports
module.exports = mongoose.model('product');