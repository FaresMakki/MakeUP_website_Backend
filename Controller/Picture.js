const Picture = require('../models/Picture');

exports.createPicture = async (req, res) => {
    try {
        const model = {
            PictureId: req.body.PictureId,
            IdProduct: req.body.IdProduct,
            Pictures: req.body.Pictures
        };
        const newPicture = new Picture(model);
        const savedPicture = await newPicture.save();
        res.status(200).json({ savedPicture });
    } catch (err) {
        res.status(400).json({ err });
    }
};

exports.getAllPictures = async (req, res) => {
    try {
        const pictures = await Picture.find();
        res.status(200).json(pictures);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPictureById = async (req, res) => {
    try {
        const picture = await Picture.findById(req.params.id);
        if (!picture) {
            return res.status(404).json({ error: 'Picture not found' });
        }
        res.status(200).json(picture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePicture = async (req, res) => {
    try {
        const picture = await Picture.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!picture) {
            return res.status(404).json({ error: 'Picture not found' });
        }
        res.status(200).json(picture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePicture = async (req, res) => {
    try {
        const picture = await Picture.findByIdAndDelete(req.params.id);
        if (!picture) {
            return res.status(404).json({ error: 'Picture not found' });
        }
        res.status(200).json({ message: 'Picture deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
