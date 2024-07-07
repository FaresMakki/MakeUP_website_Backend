const mongoose=require("mongoose")
const discountSchema=new mongoose.Schema({
    Product_id:{
        type:String,
        required:true,
    },
    discountper:{
        type:Number,
        required:true
    },
    startdate:{
        type:String,
        required:true
    },
    enddate:{
        type:String,
        required:true
    },


},{timestamps:true})
module.exports=mongoose.model('discount',discountSchema)