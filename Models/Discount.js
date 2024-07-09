const mongoose=require("mongoose")
const discountSchema=new mongoose.Schema({
<<<<<<< HEAD
    Discount_id:{
        type:String,
        required:true,
    },
    Product_id:{
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
=======
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
>>>>>>> d0e0cc3442ae80ef503858f37fc67e5a061e8c31
        type:String,
        required:true
    },


<<<<<<< HEAD

=======
>>>>>>> d0e0cc3442ae80ef503858f37fc67e5a061e8c31
},{timestamps:true})
module.exports=mongoose.model('discount',discountSchema)