const crypto=require('crypto');
const bcrypt=require('bcrypt');
const User=require('../DB/User.js');
const Mailjet =require('node-mailjet');

async function sendOTP(req,res){

    //mailjet configuration
    const mailjet = Mailjet.apiConnect(
        process.env.MAILJET_API_KEY,
        process.env.MAILJET_API_SECRET
    );

    try{
        //generating OTP
    const OTP=crypto.randomInt(0,99999);

        //making so that the OTP always has 5 digits
    const OTPstr=OTP.toString().padEnd(5,'0');

        //hashing the OTP before saving it in DB
    const hashedOTP= await bcrypt.hash(OTPstr,10);

        //searching for the user to save the OTP in 
        const newUser=await User.findOne({_id:req.user._id});
        newUser.OTP={
                hashedOTP:hashedOTP,
                createdAt:Date.now()
            }
        const savedUser=await newUser.save();

        //sending Mail(For OTP)
        const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'gokulselvan121@gmail.com',
                            Name: 'Chat-App'
                        },
                        To: [
                            {
                                Email: `${savedUser.email}`,
                                Name:`${savedUser.username}`
                            }
                        ],
                        Subject: 'Your OTP',
                        TextPart: `Your OTP for the Chat app is ${OTPstr},it will be valid for 5 minutes`,
                        HTMLPart: `<h1>${OTPstr}</h1>`
                    }
                ]
            });

        const result = await request;

        //it can send lot of messages, so this is one way to check if it was success, also we are only sending one message instead of many
        if(result.body.Messages[0].Status!=="success"){
            throw new Error("Error while sending OTP")
        }

        res.status(200).json({message:"OTP sent"});

    }catch(err){
        console.log(`Error while sending OTP ${err}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}


module.exports=sendOTP;
