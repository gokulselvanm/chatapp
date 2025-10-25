const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ConversationSchema = new Schema({
    messages:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectID,
                ref:"Message"
            }
        ],
        default:[]
    }
})


module.exports = mongoose.model('Conversation',ConversationSchema);
