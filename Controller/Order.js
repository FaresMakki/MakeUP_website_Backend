const Order = require('../models/Order');
const Counter = require('../models/Counter');

exports.createOrder = async (req, res) => {
    try {
        let cd = await Counter.findOneAndUpdate(
            { id: "order" },
            { "$inc": { "last_id": 1 } },
            { new: true }
        );

        let seqid;
        if (cd == null) {
            const cont = new Counter({ id: "order", last_id: 1 });
            await cont.save();
            seqid = 1;
        } else {
            seqid = cd.last_id;
        }

        const model = {
            orderId: seqid,
            creationDate: req.body.creationDate,
            userName: req.body.userName,
            userId: req.body.userId,
            orderParent: req.body.orderParent,
            products: req.body.products
        };

        const newOrder = new Order(model);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
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
