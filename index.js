const cors=require("cors")
const express=require('express')
const app=express()
const mongoose=require("mongoose")
const port=3000
const User_router=require("./Route/User")
const Admin_router=require("./Route/Admin")
const Category_router=require("./Route/Category")
const SousCategory_router=require("./Route/SousCategory")
const Discount_router=require("./Route/Discount")
const types=require("./Route/Types")
const product_router=require("./Route/Products")
const picture=require("./Route/Picture")
const wholesale=require("./Route/WholeSalePurchases")
const order=require("./Route/Order")
const returned_product=require("./Route/ReturnedProduct")

app.use(cors())
// app.use(express.json())
app.use(express.json({limit : 602428800}))

app.use("/user",User_router)
app.use("/product",product_router)
app.use("/admin",Admin_router)
app.use("/category",Category_router)
app.use("/souscategory",SousCategory_router)
app.use("/discount",Discount_router)
app.use("/types",types)
app.use("/picture",picture)
app.use("/wholesale",wholesale)
app.use("/order",order)
app.use("/returned_product",returned_product)
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