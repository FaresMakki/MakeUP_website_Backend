
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
            typeid:req.body.typeid,
            ratings:[],
            totalrating:""
        }


        const user = new productModel(model);

        const sevedproduct = await user.save();
        res.status(200).json({prod: sevedproduct });


    } catch (err) {
        res.status(400).json({ err });
    }



}
exports.Getproduct=async (req,res)=>{

    await productModel.find().then((model)=>{
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

   await productModel.find({ Name: { $regex: req.params.Name, $options: 'i' } }).then((model)=>{
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
exports.Getproductsbytype=async (req,res)=>{
    console.log(req.params.type)
   await productModel.find({ typeid:req.params.type }).then((model)=>{
            if(!model){
                res.status(200).json({message:"no product here ",sugg:null})
            }else{
                res.status(200).json({message:"products:",sugg:model})
            }


        }).catch(function (err) {
            res.status(400).json({err})
            console.log("something went wrong")
        })



}
exports.DeleteProduct=async (req,res)=>{


    const id=req.params.id
   await productModel.findByIdAndDelete(id).then((model)=>{
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
    console.log("T_T")
    const newprod={}
    if (req.body.Name !== "") {
        newprod.Name = req.body.Name;
    }
    if (req.body.Prices !== "") {
        newprod.Prices = req.body.Prices;
    }
    if (req.body.Description !== "") {
        newprod.Description = req.body.Description;
    }
    if (req.body.ingredients !== "") {
        newprod.ingredients = req.body.ingredients;
    }
    if (req.body.Comment_utiliser !== "") {
        newprod.Comment_utiliser = req.body.Comment_utiliser;
    }
    if (req.body.effects !== "") {
        newprod.effects = req.body.effects;
    }

    if (req.body.brand !== "") {
        newprod.brand = req.body.brand;
    }



    const id=req.params.id
   await productModel.findByIdAndUpdate(id,newprod).then((model)=>{
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

   await productModel.find({ brand:req.body.brand}).then((model)=>{
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
exports.GetproductbyID=async (req,res)=>{

  await  productModel.find({ _id:req.params.id}).then((model)=>{
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

exports.asyncHandler = async (req, res) => {
    const { _id } = req.params; // Extract _id from req.params
    const { star, prodId } = req.body;

    try {
        const product = await productModel.findById(prodId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        let alreadyRated = product.ratings.find(
            (rating) => rating.postedby.toString() === _id.toString()
        );

        let updateRating;

        if (alreadyRated) {
            updateRating = await productModel.updateOne(
                { "ratings._id": alreadyRated._id },
                { $set: { "ratings.$.star": star } },
                { new: true }
            );
        } else {
            updateRating = await productModel.findByIdAndUpdate(
                prodId,
                { $push: { ratings: { star: star, postedby: _id } } },
                { new: true }
            );
        }

        const getAllRating = await productModel.findById(prodId);
        const totalRating = getAllRating.ratings.length;
        const ratingSum = getAllRating.ratings.reduce((sum, item) => sum + item.star, 0);
        const actualRating = Math.round(ratingSum / totalRating);

        const finalRating = await productModel.findByIdAndUpdate(
            prodId,
            { totalrating: actualRating },
            { new: true }
        );

        return res.status(200).json(finalRating);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.Getproductbyprice=async (req,res)=>{

    try {
        console.log(req.params.min)
        const products = await productModel.find({});
        // Filter products based on price range
        const filteredProducts = products.filter(product => {
            const price = parseFloat(product.Prices);

            return price < req.params.min ;
        });

        if (filteredProducts.length === 0) {
            res.status(200).json({ message: "No products found in this price range", filteredProducts: null });
        } else {
            res.status(200).json({ message: "Products found:", filteredProducts: filteredProducts });
        }
    } catch (err) {
        res.status(400).json({ err });
        console.log("Something went wrong:", err);
    }



}
