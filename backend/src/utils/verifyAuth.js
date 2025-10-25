const JWT=require('jsonwebtoken');

function verifyAuth(req,res){

    const token=req.cookies.token;
    try{
        //if token not in the cookies
        if(!token){
            res.status(400).json({message:"No token available"})
        }else{
            const JWT_SECRET=process.env.JWT_SECRET;
            try{
                //getting back the payload from teh token
                const payload=JWT.verify(token,JWT_SECRET);
                res.status(200).json({message:"Authentication Verified"});

            }catch(err){
                res.status(400).json({message:"Invalid Token"});
            }
        }

    }catch(err){
        console.log(`Error while verifying auth ${err}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}




module.exports=verifyAuth;
