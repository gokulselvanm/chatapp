function sendUserDetails(req,res){
    try{
        res.status(200).json(req.user);
    }catch(err){
        console.log(`Error while sending user data: ${err}`)
        res.status(500).json({message:"Interval Server Error"})
    }
}

module.exports = sendUserDetails;
