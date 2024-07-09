const categorytypes = require("../Models/Category_types");
exports.addcategorytypes=async (req,res)=>{
    try {

        console.log("hi im here")
        console.log(req.body)
        const model = {
            Name: req.body.Name,
            sousCategoryid:req.body.sousCategoryid
        };

        console.log("imhere")
        const type =new categorytypes(model);
        console.log("voooo")
        const savedtype = await type.save();
        res.status(200).json({ savedtype });
    } catch (err) {
        res.status(400).json({ err });
    }



}
exports.getcategorytypes=async (req,res)=>{
    if(req.params.id==="all"){
        categorytypes.find().then((model)=>{
            if(!model){
                res.status(200).json({message:"no types added ",categorytypes:null})
            }else{
                res.status(200).json({message:"types list",categorytypes:model})
            }


        }).catch(function (err) {
            res.status(400).json({err})
            console.log("something went wrong")
        })}

    else{
        categorytypes.find({sousCategoryid:req.params.id}).then((model)=>{
            if(!model){
                res.status(200).json({message:"no types added ",categorytypes:null})
            }else{
                res.status(200).json({message:"types list",categorytypes:model})
            }


        }).catch(function (err) {
            res.status(400).json({err})
            console.log("something went wrong")
        })}
}
exports.Updatecategorytypes=async (req,res)=>{

    const newtype={
        Name:req.body.Name,

    }



    const id=req.params.id
    categorytypes.findByIdAndUpdate(id,newtype).then((model)=>{
        if(!model){
            res.status(200).json({message:"no type found ",Updatedtypes:null})
        }else{
            res.status(200).json({message:"types updated",Updatedtypes:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })
}
exports.deletecategorytypes=async (req,res)=>{
    const id=req.params.id
    categorytypes.findByIdAndDelete(id).then((model)=>{
        if(!model){
            res.status(200).json({message:"type found ",deletedtypes:null})
        }else{
            res.status(200).json({message:"type deleted",deletedtypes:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })
}
