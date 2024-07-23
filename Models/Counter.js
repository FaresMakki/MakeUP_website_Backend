const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    last_id: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Counter', counterSchema);
