const express=require('express')
const router=express.Router();
const user=require("../Controller/User")
const Admin=require("../Controller/Admin")
router.get("/login_check/:email/:password",user.checkUser)
router.post("/signup",user.add)
router.post("/verifyuser/:activationcode",user.VerifyUser)

module.exports=router