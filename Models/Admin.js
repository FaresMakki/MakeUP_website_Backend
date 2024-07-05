const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({
    Admin_id:{
        type:Number,
        required:true,
        default:1
    },
    Name:{
        type:String,
        required:true
    },
    e_mail:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },


},{timestamps:true})
module.exports=mongoose.model('admins',adminSchema)