const express=require('express')
const router=express.Router();
const product=require("../Controller/Product")
router.post("/add",product.add)
router.get("/Getbytype/:typeid",product.Getproductbytype)
router.get("/Getbybrand/:brand",product.Getproductbybrand)
router.get("/GetbyName/:Name",product.GetproductbyName)
router.post("/update/:id",product.UpdateProduct)
router.post("/delete/:id",product.DeleteProduct)
module.exports=router