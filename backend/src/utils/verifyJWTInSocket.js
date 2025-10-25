const JWT=require('jsonwebtoken');
const cookie= require('cookie');

function verifyJWTInSocket(socket,next){
    try{

        const cookies=cookie.parse(socket.handshake.headers.cookie||"");//using ||"" so that cookie.parse doesnt throw an error,but the further checks take care if the cookies are empty at the end
        //|| works just similar to how && works in react
        const token=cookies.token;
        if(!token){
            //returning so the function doesnt execute any further
            return next(new Error("No JWT Token Present"));
        }

        try{
            const JWT_SECRET=process.env.JWT_SECRET;
            const payload=JWT.verify(token,JWT_SECRET);
            //mounting the payload to the socket object which will remain there till the socket connection terminates
            socket.user=payload;
            next();

        }catch(err){
            //returning so the function doesnt execute any further
            return next(new Error("Invalid JWT Token"));
        }
    }catch(err){
        console.log(`Error while verifying JWT in Scokets: ${err}`);
        return next(new Error("Internal server error"));
    }

}

module.exports = verifyJWTInSocket;
