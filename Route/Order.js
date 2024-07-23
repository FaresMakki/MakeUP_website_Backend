const express = require('express');
const orderController = require('../Controller/Order');
const router = express.Router();

router.post('/add', orderController.createOrder);
router.get('/getall', orderController.getAllOrders);
router.get('/get/:id', orderController.getOrderById);
router.post('/update/:id', orderController.updateOrder);
router.post('/delete/:id', orderController.deleteOrder);

module.exports = router;
