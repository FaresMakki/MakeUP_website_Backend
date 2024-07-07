const express=require('express')
const router=express.Router();
const discount=require("../Controller/Discount")
router.post("/add",discount.adddiscount)



module.exports=router