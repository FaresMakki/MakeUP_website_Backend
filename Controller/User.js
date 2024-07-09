const usermodel=require("../Models/User")
const countermodel=require("../Models/Counters")
const nodemailer=require("nodemailer")
var bcrypt=require("bcryptjs")
const {sendConfirmationEmail} = require("../nodemailer");
const {v4:uuidv4}=require("uuid")
const {request} = require("express");
//CHECK IF USER  IS EXIST (LOGIN)

exports.checkUser=async (req,res)=>{
       let mail=req.params.email
       // let mail=req.body.email
       let pass=req.params.password
       // let pass=req.body.password
    // console.log(req.body)
    // console.log(pass)


    usermodel.findOne(
        {
            $and:
                [{ e_mail: mail }]
        }).then(async function (models) {

        if (!models){

            res.status(200).json({state:"user does not exist",User:null})
        }else{

            if (models.isactive===false){



                let x=uuidv4()

                let maintenant=new Date()
                    const annee = maintenant.getFullYear();
                    const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0, donc on ajoute 1
                    const jour = maintenant.getDate().toString().padStart(2, '0');
                    const heures = maintenant.getHours().toString().padStart(2, '0');
                    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
                    const secondes = maintenant.getSeconds().toString().padStart(2, '0');
                    models.activationcodedate=`${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`
                    models.activationcode=x
                    models.save()
                    sendConfirmationEmail(models.e_mail,x)

                     res.status(200).json({state:"we sent an email to your account you need to conform",User:null})















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
        let activationcod=uuidv4()

        const maintenant = new Date();


        const annee = maintenant.getFullYear();
        const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0, donc on ajoute 1
        const jour = maintenant.getDate().toString().padStart(2, '0');
        const heures = maintenant.getHours().toString().padStart(2, '0');
        const minutes = maintenant.getMinutes().toString().padStart(2, '0');
        const secondes = maintenant.getSeconds().toString().padStart(2, '0');

        const dateFormatee = `${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`;

        const model = {
            Userid: seqid,
            Name: req.body.Name,
            Address: req.body.Address,
            PhoneNum: req.body.PhoneNum,
            activationcodedate:dateFormatee,
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

    console.log(req.params.activationcode)
    usermodel.findOne({activationcode:req.params.activationcode}).then((user)=>{
            if(!user){
                console.log("nothing here")
                res.status(200).json({message:"impossible de lactivation de votre compte(code est incorrect)"})

            }else{



                let maintenant=new Date()
                console.log(`database time ${user.activationcodedate}`)
                const differenceEnMillisecondes = maintenant - new Date(user.activationcodedate);
                console.log(differenceEnMillisecondes)
                const millisecondesEn24Heures = 20*1000

                console.log(`the deferance is ${differenceEnMillisecondes - millisecondesEn24Heures}`)
                if (differenceEnMillisecondes >= millisecondesEn24Heures) {

                    let x=uuidv4()

                    console.log(x)
                    console.log(x)
                    console.log(x)





                    const annee = maintenant.getFullYear();
                    const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0, donc on ajoute 1
                    const jour = maintenant.getDate().toString().padStart(2, '0');
                    const heures = maintenant.getHours().toString().padStart(2, '0');
                    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
                    const secondes = maintenant.getSeconds().toString().padStart(2, '0');
                    console.log(`the new now time : ${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`)
                    user.activationcodedate=`${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`
                    user.activationcode=x
                    user.save()
                    sendConfirmationEmail(user.e_mail,x)
                    res.status(200).json({state:"expired"})
                } else {

                    console.log("im going to save it")
                    user.isactive=true;
                    console.log("done")
                    user.save()
                    res.status(200).json({state:"non expired"})

                }








            }
        }
    )
}
