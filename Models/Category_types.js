const mongoose=require("mongoose")
const categorytypesShema=new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },

    sousCategoryid:{
        type:String,
        required:String
    }



},{timestamps:true})
module.exports=mongoose.model('categorytypes',categorytypesShema)