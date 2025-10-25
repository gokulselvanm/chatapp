const User = require('../DB/User.js');
const Contact = require('../DB/Contact.js');
const Conversation = require('../DB/Conversation.js');

async function addNewContact(req,res){

    try{
        //finding if the user to be added exists in the database(has made an account)
        const newContactUser = await User.findOne({email:req.params.email});
        if(!newContactUser){
            return res.status(400).json({message:"User does not exist"});
        }


        //getting the current user's contacts to add the new contact
        const usrContacts= await Contact.findOne({userID:req.user.id});//getting all the contacts of that user

        //getting the other user's contacts to add the new contact
        const newUsrContacts = await Contact.findOne({userID:newContactUser._id})

        const existingContact= usrContacts.Contacts.find(contactDoc=>contactDoc.contactID.toString()===newContactUser._id.toString())//normal JS function
        //if the current user doesnt have that contact,neither will the other one, as we create the contacts for both at a time
        if(!existingContact){

            const newConvo = await new Conversation({messages:[]}).save();

            usrContacts.Contacts.push(
                {
                    contactID:newContactUser._id,
                    conversationID:newConvo._id
                }
            )
            await usrContacts.save();

            //if the user is adding themselves as a contact
            if(newUsrContacts.userID.toString()!==usrContacts.userID.toString()){//have to use .toString() to compare two object ID, or else it doesnt compare properly
                newUsrContacts.Contacts.push(
                    {
                        contactID:req.user.id,
                        conversationID:newConvo._id
                    }
                )
                await newUsrContacts.save();
            }

            res.status(200).json({message:"Contact Added successfully"})
        }else{
            res.status(200).json({message:"Pre-existing Contact"})
        }
    }catch(err){
        console.log(`Error while adding new contact: ${err}`)
        res.status(500).json({message:"Interval Server Error"})
    }
}


module.exports = addNewContact;
