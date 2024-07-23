const express = require('express');
const returnedProductController = require('../Controller/ReturnedProduct');
const router = express.Router();

router.post('/add', returnedProductController.createReturnedProduct);
router.get('/getall', returnedProductController.getAllReturnedProducts);
router.get('/get/:id', returnedProductController.getReturnedProductById);
router.post('/update/:id', returnedProductController.updateReturnedProduct);
router.post('/delete/:id', returnedProductController.deleteReturnedProduct);

module.exports = router;
