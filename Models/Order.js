const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productPrice: Number,
    _id:false
});

const orderSchema = new mongoose.Schema({


    userID: {
        type: String,
        required: true
    },
    products: {
        type: {},
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
