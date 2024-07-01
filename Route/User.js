const express=require('express')
const router=express.Router();
const user=require("../Controller/User")
router.get("/login_check",user.checkUser)
router.post("/signup",user.add)
router.post("/verifyuser/:activationcode",user.VerifyUser)

module.exports=router