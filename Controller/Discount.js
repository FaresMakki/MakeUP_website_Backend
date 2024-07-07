const discount = require("../Models/Discount");
exports.adddiscount=async (req,res)=>{
    try {

        
        console.log("hi im here")
        console.log(req.body)
        const model = {
            Product_id: req.body.azmi,
            discountper:req.body.fares,
            startdate:req.body.startdate,
            enddate:req.body.dateend
        };

        console.log("imhere")
        const dis =new discount(model);
        console.log("voooo")
        const saveddis = await dis.save();
        res.status(200).json({ saveddis });
    } catch (err) {
        res.status(400).json({ err });
    }



}
