function logout(req,res){
    try{
        //set the token cookie (where our JWT token was present) to empty
        res.cookie("token","",{
            httpOnly:true,
            maxAge:0,
            sameSite:'lax',
            secure:false
        })
        res.status(200).json({message:"Logged Out Successfully"})
    }catch(err){
        console.log(`Error while logging out ${err}`);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports=logout;
