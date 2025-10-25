const mongoose=require('mongoose');

const MONGODB_URL=process.env.MONGODB_URI;

//establishing connection with mongodb database
mongoose.connect(MONGODB_URL).then(()=>{
    console.log("Connection to Mongodb server successfull");
}).catch((err)=>{
    console.log("Error while connecting to mongodb");
})


