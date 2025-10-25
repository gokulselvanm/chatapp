const router=require('express').Router();
const passport=require('passport');

const signup=require('../Controllers/signup.js');
const login=require('../Controllers/login.js');
const sendJWT=require('../utils/sendJWT.js');
const logout=require('../Controllers/logout.js');
const verifyAuth=require('../utils/verifyAuth.js');
const sendOTP=require('../utils/sendOTP.js');
const verifyOTP=require('../utils/verifyOTP.js');

require('../utils/googleStrategy.js');

const frontendURL=process.env.FRONTEND_URL;


router.post('/signup',signup,sendOTP);

router.post('/verifyOTP',verifyOTP)

router.post('/login',login,sendJWT,(req,res)=>{
        res.status(200).json({message:"Authentication Successfull"});
});

router.get('/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/google/redirect',passport.authenticate('google',{session:false}),sendJWT,(req,res)=>{
    res.status(200).redirect(`${frontendURL}/home`);
});

router.post('/logout',logout);

router.post('/verifyauth',verifyAuth);


module.exports=router;
