const Order = require('../models/Order');
const Counter = require('../models/Counter');
const usermodel = require("../Models/User");
const productModel = require("../Models/Product");

exports.createOrder = async (req, res) => {
    try {   console.log("ttttt")

        const model = {
            userID: req.body.userID,
            products: req.body.products
        };
        console.log(model)
        const newOrder = new Order(model);
        const savedOrder = await newOrder.save();
        res.status(200).json({ord:savedOrder});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({orders: orders});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllOrdersinformation = async (req, res) => {
    try {
        const orders = await Order.find();
        const ordersArray = Array.isArray(orders) ? orders : [];

        const users= await usermodel.find()
        const usersArray = Array.isArray(users) ? users : [];

        const product=  await productModel.find()
        const productArray = Array.isArray(product) ? product : [];



        const  totalcommande=ordersArray.length
        let profit=0
        let PanierMoyenne=0
        let Totalusers=usersArray.length
        let Totalproduct=productArray.length

        for(let i of orders){
            let aux=0
            Object.keys(i.products).forEach(key => {
                profit=profit+i.products[key][0]*i.products[key][1]
            });
        }
        PanierMoyenne=profit/ordersArray.length

       // let c=
       //     {profit:profit.toFixed(2),
       //      PanierMoyenne:PanierMoyenne.toFixed(2),
       //      totalcommande:totalcommande,
       //      Totalusers:Totalusers,
       //      Totalproduct: Totalproduct
       //
       //      }
        res.status(200).json(  {profit:profit.toFixed(2),
            PanierMoyenne:PanierMoyenne.toFixed(2),
            totalcommande:totalcommande,
            Totalusers:Totalusers,
            Totalproduct: Totalproduct

        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({ orderId: req.params.id }, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
