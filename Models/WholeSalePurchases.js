const mongoose = require('mongoose');

const wholesaleSchema = new mongoose.Schema({
    ProductId: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    BuyDate: {
        type: Date,
        required: true
    },
    ExpirationDate: {
        type: Date,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Wholesale', wholesaleSchema);
