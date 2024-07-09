<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const discount = require('../Controller/Discount');
router.post('/add', discount.createDiscount);
router.get('/getall', discount.getAllDiscounts);
router.get('/get/:id', discount.getDiscountById);
router.post('/update/:id', discount.updateDiscount);
router.post('/delete/:id', discount.deleteDiscount);

module.exports = router;
=======
const express=require('express')
const router=express.Router();
const discount=require("../Controller/Discount")
router.post("/add",discount.adddiscount)



module.exports=router
>>>>>>> d0e0cc3442ae80ef503858f37fc67e5a061e8c31
