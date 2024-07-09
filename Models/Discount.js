const mongoose=require("mongoose")
const discountSchema=new mongoose.Schema({
    Discount_id:{
        type:String,
        required:true,
    },
    Product_id:{
        type:String,
        required:true
    },
    Type_id:{
        type:String,
        required:true
    },
    Discount_perc:{
        type:Number,
        required:true
    },
    Start_date:{
        type:String,
        required:true
    },
    End_date:{
        type:String,
        required:true
    },



},{timestamps:true})
module.exports=mongoose.model('discount',discountSchema)