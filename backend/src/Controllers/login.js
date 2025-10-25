const User=require('../DB/User.js');
const bcrypt=require('bcrypt');

async function login(req,res,next){
    try{
        //extracting all data from req body
        const email=req.body.email;
        const password=req.body.password;

        //checking the database if user exists
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({message:"User Does not exist"});
        }else if(user.googleID){
            //if user has signed in with google
            res.status(400).json({message:"User has signed in with google"});
        }else{
            if(!user.verified){
                await User.deleteOne({_id:user._id});
                res.status(400).json({message:"User hasnt been verified please signIn again"})
            }
            //verifing password
            const verifiedPass=await bcrypt.compare(password,user.password);
            if(verifiedPass){
                req.user=user;
                next();
            }else{
                res.status(400).json({message:"Incorrect Password"});
            }
        }
    }catch(err){
        res.status(500).json({message:"Interval Server Error"})
    }
}

module.exports=login;
