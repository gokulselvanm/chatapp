const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({

    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required: function(){//no arrow function allowed
            return(!this.googleID)
        }
    },

    verified:{
        type:Boolean,
        required:function(){
            return(!this.googleID)
        }
    },

    googleID:{
        type:String,
        unique: true,
        sparse: true 
    },

    OTP:{

        hashedOTP:{
            type:String,
            required:function(){
                return(!this.googleID)
            },
            default:"00000"
        },

        createdAt:{
            type:Date,
            default:Date.now()
        }

    }


})

//makes a collection named 'users'
const User=mongoose.model('User',userSchema);

module.exports=User;
