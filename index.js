const cors=require("cors")
const express=require('express')
const app=express()
const mongoose=require("mongoose")
const port=3000
const User_router=require("./Route/User")
app.use(cors())
app.use(express.json())

app.use("/user",User_router)

mongoose.connect('mongodb://localhost:27017/Makeup_Website_database',{
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