const ReturnedProduct = require('../models/ReturnedProduct');
const {model} = require("mongoose");

// Create a new returned product
exports.createReturnedProduct = async (req, res) => {
    try {
        const model={
            retProdId: req.body.retProdId,
            orderId: req.body.orderId,
            returningDate: req.body.returningDate
        }
        const newReturnedProduct = new ReturnedProduct(model)
        const savedReturnedProduct = await newReturnedProduct.save();
        res.status(200).json({ savedReturnedProduct });
    } catch (err) {
        res.status(400).json({ err });
    }
};

// Get all returned products
exports.getAllReturnedProducts = async (req, res) => {
    try {
        const returnedProducts = await ReturnedProduct.find();
        res.status(200).json(returnedProducts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get returned product by ID
exports.getReturnedProductById = async (req, res) => {
    try {
        const returnedProduct = await ReturnedProduct.findById(req.params.id);
        if (!returnedProduct) {
            return res.status(404).json({ error: 'Returned product not found' });
        }
        res.status(200).json(returnedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update returned product
exports.updateReturnedProduct = async (req, res) => {
    try {
        const returnedProduct = await ReturnedProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!returnedProduct) {
            return res.status(404).json({ error: 'Returned product not found' });
        }
        res.status(200).json(returnedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete returned product
exports.deleteReturnedProduct = async (req, res) => {
    try {
        const returnedProduct = await ReturnedProduct.findByIdAndDelete(req.params.id);
        if (!returnedProduct) {
            return res.status(404).json({ error: 'Returned product not found' });
        }
        res.status(200).json({ message: 'Returned product deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
