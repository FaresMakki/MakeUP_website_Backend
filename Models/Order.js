const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productPrice: Number,
    _id:false
});

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        default: 1
    },
    creationDate: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    orderParent: {
        type: Number,
        required: true
    },
    products: {
        type: [productSchema],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
