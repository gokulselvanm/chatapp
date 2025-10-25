const passport=require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const User=require('../DB/User.js');
require('dotenv').config();

const googleClientID=process.env.GOOGLE_CLIENT_ID;
const googleClientSecret=process.env.GOOGLE_CLIENT_SECRET;
const backendURL= process.env.BACKEND_URL;
const googleCallbackURL=`${backendURL}/auth/google/redirect`;


passport.use(new googleStrategy({
    //required to get data from google
    clientID:googleClientID,
    clientSecret:googleClientSecret,
    //where google redirects after the consent screen
    callbackURL:googleCallbackURL
},async function(accessToken,refreshToken,profile,done){
    try{
        const user=await User.findOne({email:profile.emails[0].value});
        if(user){
            //user exists
            if(!user.googleID){
                //if user didnt previously signup with google googleID wont exist
                done(null,false,{message:"User hasnt signed up with google"});
            }else{
                //user has used google to signup
                done(null,user);
            }

        }else{
            //user does not exist
            const newUser= new User({
                googleID:profile.id,
                email:profile.emails[0].value,
                username:profile.displayName
            })
            const savedUser=await newUser.save();
            done(null,savedUser);
        }
    }catch(err){
        console.log(`Error while authenticating with google ${err}`);
        done(new Error("Internal Server Error"),false);
    }
}
))
