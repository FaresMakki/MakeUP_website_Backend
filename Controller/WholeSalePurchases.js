const Wholesale = require('../Models/WholeSalePurchases');


exports.createPurchase = async (req, res) => {
    const purchase = new Wholesale({
        ProductId: req.body.ProductId,
        Quantity: req.body.Quantity,
        BuyDate: req.body.BuyDate,
        ExpirationDate: req.body.ExpirationDate,
        Price: req.body.Price,
    });

    try {
        const newPurchase = await purchase.save();
        res.status(201).json(newPurchase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllPurchases = async (req, res) => {
    try {
        const purchases = await Wholesale.find();
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        const purchase = await Wholesale.findById(req.params.id);
        if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
        res.status(200).json(purchase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPurchasesByQuantity = async (req, res) => {
    try {
        const purchases = await Wholesale.find({ Quantity: req.params.quantity });
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPurchasesByBuyDate = async (req, res) => {
    try {
        const purchases = await Wholesale.find({ BuyDate: req.params.buyDate });
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPurchasesByExpirationDate = async (req, res) => {
    try {
        const purchases = await Wholesale.find({ ExpirationDate: req.params.expirationDate });
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPurchasesByPrice = async (req, res) => {
    try {
        const purchases = await Wholesale.find({ Price: req.params.price });
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePurchase = async (req, res) => {
    try {
        const updateData = req.body;
        const updatedPurchase = await Wholesale.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedPurchase) return res.status(404).json({ message: 'Purchase not found' });
        res.status(200).json(updatedPurchase);
    } catch (err) {
        res.status400.json({ message: err.message });
    }
};

exports.deletePurchase = async (req, res) => {
    try {
        const deletedPurchase = await Wholesale.findByIdAndDelete(req.params.id);
        if (!deletedPurchase) return res.status(404).json({ message: 'Purchase not found' });
        res.status(200).json({ message: 'Purchase deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


