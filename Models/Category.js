const mongoose=require("mongoose")
const categoryShema=new mongoose.Schema({
    Cat_id:{
        type:Number,
        required:true,
        default:1
    },
    Name:{
        type:String,
        required:true
    },
    icone:{
        type:String,
        required:true
    },



},{timestamps:true})
module.exports=mongoose.model('category',categoryShema)