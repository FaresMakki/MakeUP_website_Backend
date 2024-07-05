const mongoose=require("mongoose")
const souscategoryShema=new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    Categoryid:{
        type:String,
        required:String
    }



},{timestamps:true})
module.exports=mongoose.model('souscategory',souscategoryShema)