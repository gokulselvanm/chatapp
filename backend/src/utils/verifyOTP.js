const bcrypt=require('bcrypt');
const User=require('../DB/User.js');

async function verifyOTP(req,res,next){
    const email=req.body.email;
    const otp=req.body.otp;
    try{

        //if email wasnt sent along with the OTP
        if(!email){
            res.status(400).json({message:"Email not present"});
        }
        //searching in DB for the email
        const user=await User.findOne({email:email});
        if(user){
            //checking if the user is already verified
            if(user.verified){
                res.status(400).json({message:"User is already verified"});
            }else{
                //verifying the sent OTP with the hashed OTP saved in the database
                const otpVresults= await bcrypt.compare(otp,user.OTP.hashedOTP);
                if(otpVresults){
                    //if the OTP was created more than 10 mins ago, its invalid
                    if((Date.now()-user.OTP.createdAt)/(1000*60)>10){
                        res.status(400).json({message:"OTP is invalid,please sign in again"});
                    }else{
                        //verifying the user
                        user.verified=true;
                        await user.save();
                        res.status(200).json({message:"Signup successfull,login to continue"})
                    }
                }else{
                    //if OTP fails,deleting the user so the user can re sign in 
                    await User.deleteOne({email:email});
                    res.status(400).json({message:"Invalid OTP, please sign in again"});
                }
            }
        }else{
            res.status(400).json({message:"No User exists"});
        }

    }catch(err){
        console.log(`Error while verifing OTP ${err}`);
        res.status(500).json({message:"Internal server error"});
    }

}

module.exports=verifyOTP;
