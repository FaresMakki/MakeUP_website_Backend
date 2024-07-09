const souscategorymodel = require("../Models/SousCategory");
exports.addSousCategory=async (req,res)=>{
    try {

        console.log("hi im here")
        console.log(req.body)
        const model = {
            Name: req.body.Name,
            Categoryid:req.body.Categoryid
        };

        console.log("imhere")
        const cat =new souscategorymodel(model);
        console.log("voooo")
        const savedsoucat = await cat.save();
        res.status(200).json({ savedsoucat });
    } catch (err) {
        res.status(400).json({ err });
    }



}
exports.getSousCategory=async (req,res)=>{
if(req.params.id==="all"){
    souscategorymodel.find().then((model)=>{
        if(!model){
            res.status(200).json({message:"no souscategory added ",SousCategorys:null})
        }else{
            res.status(200).json({message:"sousCategory list",SousCategorys:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log("something went wrong")
    })}

else{
    souscategorymodel.find({Categoryid:req.params.id}).then((model)=>{
        if(!model){
            res.status(200).json({message:"no souscategory added ",SousCategorys:null})
        }else{
            res.status(200).json({message:"sousCategory list",SousCategorys:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log("something went wrong")
    })}
}
exports.UpdateSousCategory=async (req,res)=>{
    console.log(req.body)
    console.log(req.params)
        const newcategorie={
            Name:req.body.Name,

        }



    const id=req.params.id
    souscategorymodel.findByIdAndUpdate(id,newcategorie).then((model)=>{
        if(!model){
            res.status(200).json({message:"no souscategory found ",SousCategory:null})
        }else{
            res.status(200).json({message:"sous Category updated",SousCategory:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })
}
exports.deleteSousCategory=async (req,res)=>{
    const id=req.params.id
    souscategorymodel.findByIdAndDelete(id).then((model)=>{
        if(!model){
            res.status(200).json({message:"no souscategory found ",SousCategory:null})
        }else{
            res.status(200).json({message:"sousCategory deleted",SousCategory:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })
}
