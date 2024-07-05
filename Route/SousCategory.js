const express=require('express')
const router=express.Router();
const souscategory=require("../Controller/SousCategory")
router.post("/add",souscategory.addSousCategory)
router.get("/Getall/:id",souscategory.getSousCategory)
router.post("/update",souscategory.UpdateSousCategory)
router.post("/delete/:id",souscategory.deleteSousCategory)


module.exports=router