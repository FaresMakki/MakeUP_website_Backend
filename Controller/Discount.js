const Discount = require('../models/Discount');

exports.createDiscount = async (req, res) => {
    try {
        const model = {
            Discount_id: req.body.Discount_id,
            Product_id: req.body.Product_id,
            Type_id: req.body.Type_id,
            Discount_perc: req.body.Discount_perc,
            Start_date: req.body.Start_date,
            End_date: req.body.End_date,
        };
        const newDiscount = new Discount(model);
        const savedDiscount = await newDiscount.save();
        res.status(200).json({ savedDiscount });
    } catch (err) {
        res.status(400).json({ err });
    }
};

exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a discount by ID
exports.getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.id);
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.status(200).json(discount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get discounts by Discount_perc
exports.getDiscountsByPercentage = async (req, res) => {
    try {
        const discount_perc = req.params.discount_perc;
        const discounts = await Discount.find({ Discount_perc: discount_perc });
        if (discounts.length === 0) {
            return res.status(404).json({ error: 'No discounts found with the specified percentage' });
        }
        res.status(200).json(discounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get discounts by Discount_perc range
exports.getDiscountsByPercentageRange = async (req, res) => {
    try {
        const min = req.query.min;
        const max = req.query.max;
        const discounts = await Discount.find({
            Discount_perc: { $gte: min, $lte: max }
        });

        if (discounts.length === 0) {
            return res.status(404).json({ error: 'No discounts found within the specified range' });
        }
        res.status(200).json(discounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get discounts by Type_id
exports.getDiscountsByTypeId = async (req, res) => {
    try {
        const type_id = req.params.type_id;
        const discounts = await Discount.find({ Type_id: type_id });
        if (discounts.length === 0) {
            return res.status(404).json({ error: 'No discounts found for the specified type' });
        }
        res.status(200).json(discounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get discounts by Product_id
exports.getDiscountsByProductId = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const discounts = await Discount.find({ Product_id: product_id });
        if (discounts.length === 0) {
            return res.status(404).json({ error: 'No discounts found for the specified product' });
        }
        res.status(200).json(discounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update discount by Start_date
exports.updateDiscount = async (req, res) => {
    try {
        const updateFields = {};

        if (req.body.Start_date) updateFields.Start_date = req.body.Start_date;
        if (req.body.End_date) updateFields.End_date = req.body.End_date;
        if (req.body.Type_id) updateFields.Type_id = req.body.Type_id;
        if (req.body.Discount_perc) updateFields.Discount_perc = req.body.Discount_perc;

        const discount = await Discount.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }

        res.status(200).json(discount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.status(200).json({ message: 'Discount deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
