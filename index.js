const cors=require("cors")
const express=require('express')
const app=express()
const mongoose=require("mongoose")
const port=3000
const User_router=require("./Route/User")
const Admin_router=require("./Route/Admin")
const Category_router=require("./Route/Category")
const SousCategory_router=require("./Route/SousCategory")
<<<<<<< HEAD
const Discount_router=require("./Route/Discount")
=======
const types=require("./Route/Types")
const discount=require("./Route/Discount")
>>>>>>> d0e0cc3442ae80ef503858f37fc67e5a061e8c31
app.use(cors())
// app.use(express.json())
app.use(express.json({limit : 52428800}))

app.use("/user",User_router)
app.use("/admin",Admin_router)
app.use("/category",Category_router)
app.use("/souscategory",SousCategory_router)
<<<<<<< HEAD
app.use("/discount",Discount_router)
=======
app.use("/discount",discount)
app.use("/types",types)
>>>>>>> d0e0cc3442ae80ef503858f37fc67e5a061e8c31

app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017\n/Makeup_Website_database',{
    useNewUrlParser:true,
})
const db=mongoose.connection





db.on('error',console.error.bind(console,'connection error'))





db.once('open',function (){
    console.log("connction avec succe")

})






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})