const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema=new Schema({
    
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    Contacts:{ 
        type:[
            {
                _id:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    default:function(){
                        return new mongoose.Types.ObjectId()
                    }
                },

                contactID:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required:true,
                },

                conversationID:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Conversation",
                    required:true
                }
            }
        ],
        default:[]
    }

})


module.exports = mongoose.model('Contact',ContactSchema);
