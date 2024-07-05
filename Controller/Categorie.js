const countermodel = require("../Models/Counters");
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcryptjs");
const categorymodel = require("../Models/Category");
const {sendConfirmationEmail} = require("../nodemailer");
exports.addCategory=async (req,res)=>{
    try {

        let cd = await countermodel.findOneAndUpdate(
            { id: "category" },
            { "$inc": { "last_id": 1 } },
            { new: true }
        );

        let seqid;
        if (cd == null) {
            const cont = new countermodel({ id: "category", last_id: 1 });
            await cont.save();
            seqid = 1;
        } else {
            seqid = cd.last_id;
        }


        const model = {
            Cat_id: seqid,
            Name: req.body.Name,
            icone:req.body.icone
        };


        const user =new categorymodel(model);

        const savedcat = await user.save();
        res.status(200).json({ savedcat });
    } catch (err) {
        res.status(400).json({ err });
    }



}
exports.getcategorys=async (req,res)=>{
    categorymodel.find().then((model)=>{
        if(!model){
            res.status(200).json({message:"no category added ",Categorys:null})
        }else{
            res.status(200).json({message:"Category list",Categorys:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log("something went wrong")
    })
}
exports.Updatecategory=async (req,res)=>{
    console.log(req.body)
    let newcategorie={}
if(req.body.icone==="notupdated"){
     newcategorie={
        Name:req.body.Name,

    }
}else{
     newcategorie={
        Name:req.body.Name,
        icone:req.body.icone

    }
}


    const id=req.body._id
    categorymodel.findByIdAndUpdate(id,newcategorie).then((model)=>{
        if(!model){
            res.status(200).json({message:"no category found ",Category:null})
        }else{
            res.status(200).json({message:"Category updated",Category:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })
}
exports.deletecategory=async (req,res)=>{

    let cd = await countermodel.findOneAndUpdate(
        { id: "category" },
        { "$inc": { "last_id": -1 } },
        { new: true }
    );
    const id=req.params.id
    categorymodel.findByIdAndDelete(id).then((model)=>{
        if(!model){
            res.status(200).json({message:"no category found ",Category:null})
        }else{
            res.status(200).json({message:"Category deleted",Category:model})
        }


    }).catch(function (err) {
        res.status(400).json({err})
        console.log(err)
    })
}





