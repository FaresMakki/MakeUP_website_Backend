const express = require('express');
const router = express.Router();
const wholesale = require('../Controller/WholeSalePurchases');

router.post('/add', wholesale.createPurchase);
router.get('/getall', wholesale.getAllPurchases);
router.get('/get/:id', wholesale.getPurchaseById);
router.get('/quantity/:quantity', wholesale.getPurchasesByQuantity);
router.get('/buydate/:buyDate', wholesale.getPurchasesByBuyDate);
router.get('/expirationdate/:expirationDate', wholesale.getPurchasesByExpirationDate);
router.get('/price/:price', wholesale.getPurchasesByPrice);
router.post('/update/:id', wholesale.updatePurchase);
router.post('/delete/:id', wholesale.deletePurchase);

module.exports = router;
