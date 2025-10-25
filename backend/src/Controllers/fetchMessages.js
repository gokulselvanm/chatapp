const Contact = require('../DB/Contact.js');
const Conversation = require('../DB/Conversation.js');

async function fetchMessages(req,res){

    try{

        //fetching data from teh url
        const contactID=req.params.contactID;

        //finding all the contacts of the user
        const contactDoc = await Contact.findOne({userID:req.user.id})

        //finding the specific contact
        const requestedContact=contactDoc.Contacts.find((contact)=>{
            return contact.contactID.toString()===contactID
        })

        //finding the conversation document that contains all the messages
        const convo = await Conversation.findById(requestedContact.conversationID).populate({
            path:'messages',//populating all the messages in the conversation,but only a part
            options:{ 
                sort: {createdAt:-1},//will be in reverse order
                limit: 200//will limit the messages to 200
            }
        })
        res.json(convo.messages.reverse())//re reverses to make it correct
    }catch(err){
        console.log(`Error while fetching Messages ${err}`)
        res.status(500).json({message:"Internal Server Error"});
    }
}


module.exports = fetchMessages;
