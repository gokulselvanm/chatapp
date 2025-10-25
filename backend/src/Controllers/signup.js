const bcrypt = require('bcrypt');
const User = require('../DB/User.js');


async function signup(req,res,next){

    try{
        //extracting data from req
        const email=req.body.email;
        const username=req.body.username;
        const password=req.body.password;

        //searching if user already exists in db
        const user=await User.findOne({email});
        if(user){
            if(user.verified){
                res.status(400).json({message:"User already exists"});
            }else{
                await User.deleteOne({_id:user._id});
                res.status(400).json({message:"User isnt verified,please signIn again"})
            }
        }else{

            //creating new user
            //hashing the password
            const hashedpass=await bcrypt.hash(password,10);
            //creating new user
            const newUser= new User({
                email,
                username,
                password:hashedpass,
                verified:false
            })
            //saving user to db
            const savedUser=await newUser.save();
            //mounting the user to the request object
            req.user=savedUser;
            next();
        }
    }catch(err){
        console.log(`Error while signing up ${err}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports=signup;
