<<<<<<< HEAD
const Discount = require('../models/Discount');
exports.createDiscount = async (req, res) => {

    try {
        const model ={
            Discount_id: req.body.Discount_id,
            Product_id: req.body.Product_id,
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
exports.updateDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.status(200).json(discount);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
};
exports.deleteDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) {
            return res.status(200).json({ error: 'Discount not found' });
        }
        res.status(200).json({ message: 'Discount deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
=======
const discount = require("../Models/Discount");
exports.adddiscount=async (req,res)=>{
    try {

        
        console.log("hi im here")
        console.log(req.body)
        const model = {
            Product_id: req.body.azmi,
            discountper:req.body.fares,
            startdate:req.body.startdate,
            enddate:req.body.dateend
        };

        console.log("imhere")
        const dis =new discount(model);
        console.log("voooo")
        const saveddis = await dis.save();
        res.status(200).json({ saveddis });
    } catch (err) {
        res.status(400).json({ err });
    }



}
>>>>>>> d0e0cc3442ae80ef503858f37fc67e5a061e8c31
