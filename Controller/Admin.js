const adminmodel = require("../Models/Admin");
const bcrypt = require("bcryptjs");
const countermodel = require("../Models/Counters");
const {v4: uuidv4} = require("uuid");
const usermodel = require("../Models/User");
const {sendConfirmationEmail} = require("../nodemailer");
exports.CheckAdmin=async (req,res)=>{
    let mail=req.params.email
    let pass=req.params.password
    console.log(mail)
    console.log(pass)


    console.log("114")
    adminmodel.findOne(
        {
            $and:
                [{ e_mail: mail }]
        }).then(async function (models) {

        if (!models){

            res.status(200).json({state:"Account does not exist",Admin:null})
        }else{


                const isMatch = await bcrypt.compare(pass, models.Password);

                if(!isMatch){

                    res.status(200).json({state:"Password is incorrect",Admin:null})
                }else{
                    res.status(200).json({state:"connection avec succe",Admin:models})

                }

                // if({models}.models.length===0){res.status(200).json({state:false})}else{res.status(200).json({state:true})}

            }}).catch(function (err) {

        res.status(400).json({err})

    })
}



exports.addadmin=async (req,res)=>{
    try {



        const model = {
            Userid:1,
            Name: req.body.Name,
            e_mail: req.body.e_mail,
            Password: bcrypt.hashSync(req.body.Password)
        }
        console.log(model)

        const admin = new adminmodel(model);

        const savedUser = await admin.save();
        res.status(200).json({ savedUser });
    } catch (err) {
        res.status(400).json({ err });
    }



}