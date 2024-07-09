const express=require('express')
const router=express.Router();
const types=require("../Controller/Category_types")
router.post("/add",types.addcategorytypes)
router.get("/Getall/:id",types.getcategorytypes)
router.post("/update/:id",types.Updatecategorytypes)
router.post("/delete/:id",types.deletecategorytypes)


module.exports=router