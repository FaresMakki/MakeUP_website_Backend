const mongoose = require('mongoose');

const returnedProductSchema = new mongoose.Schema({
    OrderId: {
        type: Number,
        required: true
    },
    ReturningDate: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('ReturnedProduct', returnedProductSchema);
