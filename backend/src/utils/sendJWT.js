const JWT=require('jsonwebtoken');

async function sendJWT(req,res,next){

    const payload={
        username:req.user.username,
        email:req.user.email,
        id:req.user._id
    }

    const JWT_SECRET=process.env.JWT_SECRET;
    try{
        const token=JWT.sign(payload,JWT_SECRET,{expiresIn:"1d"});
        //storing the JWT token in the token cookie 
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            maxAge:24*60*60*1000,
            sameSite:'lax'
        })

        next();

    }catch(err){
        console.log(`Error while signing JWT ${err}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports=sendJWT;
