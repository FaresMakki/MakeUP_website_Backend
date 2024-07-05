const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    Userid:{
        type:Number,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    PhoneNum:{
        type:Number,
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
    ListOfFavorites:{
        type:[Number],
        required:true
    },
    activationcode:{
        type:String
    },
    activationcodedate:{
        type:String
    },
    isactive:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
module.exports=mongoose.model('users',userSchema)