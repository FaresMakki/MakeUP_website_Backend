const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    PictureId: {
        type: String,
        required: true,
        unique: true
    },
    IdProduct: {
        type: String,
        required: true
    },
    Pictures: {
        type: [String],
        required: true
    }
});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
