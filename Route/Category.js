const express=require('express')
const router=express.Router();
const category=require("../Controller/Categorie")
router.post("/add",category.addCategory)
router.get("/Getall",category.getcategorys)
router.post("/update",category.Updatecategory)
router.post("/delete/:id",category.deletecategory)


module.exports=router