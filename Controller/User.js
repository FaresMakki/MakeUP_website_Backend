const usermodel=require("../Models/User")
const countermodel=require("../Models/Counters")
const nodemailer=require("nodemailer")
var bcrypt=require("bcryptjs")
const {sendConfirmationEmail} = require("../nodemailer");
const {v4:uuidv4}=require("uuid")
//CHECK IF USER  IS EXIST (LOGIN)

exports.checkUser=async (req,res)=>{

       let mail=req.body.e_mail
       let pass=req.body.Password
    usermodel.findOne(
        {
            $and:
                [{ e_mail: mail }]
        }).then(async function (models) {

        if (!models){
            res.status(200).json({state:"user does not exist",User:null})
        }else{
            if (models.isactive===false){
                res.status(200).json({state:"user does not exist",User:null})
            }else{

        const isMatch = await bcrypt.compare(pass, models.Password);

            if(!isMatch){
            res.status(200).json({state:"Password is incorrect",User:null})
        }else{
            res.status(200).json({state:"connection avec succe",User:models})

        }

        // if({models}.models.length===0){res.status(200).json({state:false})}else{res.status(200).json({state:true})}

        }}}).catch(function (err) {

        res.status(400).json({err})

    })
}


// ADD A NEW USER WITH AUTO INCRIMENTED ID
exports.add=async (req,res)=>{
    try {


        let cd = await countermodel.findOneAndUpdate(
            { id: "user" },
            { "$inc": { "last_id": 1 } },
            { new: true }
        );

        let seqid;
        if (cd == null) {
            const cont = new countermodel({ id: "user", last_id: 1 });
            await cont.save();
            seqid = 1;
        } else {
            seqid = cd.last_id;
        }
const character="123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

let activationcod=uuidv4()

        const model = {
            Userid: seqid,
            Name: req.body.Name,
            Address: req.body.Address,
            PhoneNum: req.body.PhoneNum,
            e_mail: req.body.e_mail,
            activationcode:activationcod,
            Password: bcrypt.hashSync(req.body.Password),
            ListOfFavorites: [],
        };

        // let time=Date.now()
        // user.createIndex();
        // await usermodel.createIndexes({createdAt: 1}, {expireAfterSeconds: 20,unique:true})
        const user = new usermodel(model);

        const savedUser = await user.save();
        res.status(200).json({ savedUser });
        sendConfirmationEmail(model.e_mail,activationcod)
    } catch (err) {
        res.status(400).json({ err });
    }



}

exports.VerifyUser=(req,res)=>{
    usermodel.findOne({activationcode:req.params.activationcode}).then((user)=>{
        if(!user){
            res.status(200).json({message:"impossible de lactivation de votre compte(code est incorrect)"})

        }else{
            user.isactive=true;
            user.save()
            res.status(200).json({message:"compte activee avec succee"})



        }
    }
    )
}
