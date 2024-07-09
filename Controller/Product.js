
const countermodel = require("../Models/Counters");
const productModel = require("../Models/Product");
exports.add=async (req,res)=>{
    try {


        let cd = await countermodel.findOneAndUpdate(
            { id: "product" },
            { "$inc": { "last_id": 1 } },
            { new: true }
        );

        let seqid;
        if (cd == null) {
            const cont = new countermodel({ id: "product", last_id: 1 });
            await cont.save();
            seqid = 1;
        } else {
            seqid = cd.last_id;
        }

        const model = {
            product_id: seqid,
            Name: req.body.Name,
            Prices: req.body.Prices,
            Description:req.body.Description,
            ingredients: req.body.ingredients,
            Comment_utiliser: req.body.Comment_utiliser,
            effects:req.body.effects,
            brand:req.body.brand,
            typeid:req.body.typeid
        }

        const user = new productModel(model);

        const sevedproduct = await user.save();
        res.status(200).json({ sevedproduct });
    } catch (err) {
        res.status(400).json({ err });
    }



}
exports.Getproductbytype=async (req,res)=>{

    productModel.find({typeid:req.params.typeid}).then((model)=>{
            if(!model){
                res.status(200).json({message:"no product here ",product:null})
            }else{
                res.status(200).json({message:"products:",product:model})
            }


        }).catch(function (err) {
            res.status(400).json({err})
            console.log("something went wrong")
        })



}
exports.GetproductbyName=async (req,res)=>{

    productModel.find({ Name: { $regex: req.params.Name, $options: 'i' } }).then((model)=>{
            if(!model){
                res.status(200).json({message:"no product here ",product:null})
            }else{
                res.status(200).json({message:"products:",product:model})
            }


        }).catch(function (err) {
            res.status(400).json({err})
            console.log("something went wrong")
        })



}
exports.DeleteProduct=async (req,res)=>{


    const id=req.params.id
    productModel.findByIdAndDelete(id).then((model)=>{
        if(!model){
            res.status(200).json({message:"product no found ",product:null})
        }else{
            res.status(200).json({message:"product",product:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })



}
exports.UpdateProduct=async (req,res)=>{
    const newprod={}
    if (req.body.Name !== "non") {
        newprod.Name = req.body.Name;
    }
    if (req.body.Prices !== "non") {
        newprod.Prices = req.body.Prices;
    }
    if (req.body.Description !== "non") {
        newprod.Description = req.body.Description;
    }
    if (req.body.ingredients !== "non") {
        newprod.ingredients = req.body.ingredients;
    }
    if (req.body.Comment_utiliser !== "non") {
        newprod.Comment_utiliser = req.body.Comment_utiliser;
    }
    if (req.body.effects !== "non") {
        newprod.effects = req.body.effects;
    }
    if (req.body.brand !== "non") {
        newprod.brand = req.body.brand;
    }



    const id=req.params.id
    productModel.findByIdAndUpdate(id,newprod).then((model)=>{
        if(!model){
            res.status(200).json({message:"no category found",product:null})
        }else{
            res.status(200).json({message:"category Updatd",product:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })
}

exports.Getproductbybrand=async (req,res)=>{

    productModel.find({ brand:req.body.brand}).then((model)=>{
        if(!model){
            res.status(200).json({message:"no product here ",product:null})
        }else{
            res.status(200).json({message:"products:",product:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log("something went wrong")
    })



}


