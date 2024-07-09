const express = require('express');
const router = express.Router();
const discount = require('../Controller/Discount');
router.post('/add', discount.createDiscount);
router.get('/getall', discount.getAllDiscounts);
router.get('/get/:id', discount.getDiscountById);
router.get('/get_perc/:discount_perc', discount.getDiscountsByPercentage);
router.get('/get_perc_range/:min/:max', discount.getDiscountsByPercentageRange);
router.get('/get_type/:type_id', discount.getDiscountsByTypeId); // New route
router.get('/get_product/:product_id', discount.getDiscountsByProductId); // New route
// router.put('/:id/start-date', discount.updateDiscountByStartDate); // New route
// router.put('/:id/end-date', discount.updateDiscountByEndDate); // New route
// router.put('/:id/type', discount.updateDiscountByTypeId); // New route
// router.put('/:id/percentage', discount.updateDiscountByPercentage); // New route
router.post('/update/:id', discount.updateDiscount);
router.post('/delete/:id', discount.deleteDiscount);

module.exports = router;
