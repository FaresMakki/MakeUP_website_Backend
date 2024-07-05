const express=require('express')
const router=express.Router();
const Admin=require("../Controller/Admin")
router.get("/login/:email/:password",Admin.CheckAdmin)
router.post("/add",Admin.addadmin)


module.exports=router