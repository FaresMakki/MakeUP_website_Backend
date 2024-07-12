const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({

    IdProduct: {
        type: String,
        required: true
    },
    Pictures: {
        type: [String],
        required: true
    },
    mainpicture: {
        type: String,
        required: true
    }
});

const Picture = mongoose.model('picture', pictureSchema);

module.exports = Picture;
