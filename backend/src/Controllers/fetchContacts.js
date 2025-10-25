const Contact = require('../DB/Contact.js');

async function fetchContacts(req,res){

    try{
        //const Contacts = await Contact.findOne({userID:req.user.id},{'Contacts.contact':1})
        //fetching all the contacts and for each contact populating the user of the contact(contactID is the other user's ID)
        const ContactsDoc = await Contact.findOne({userID:req.user.id}).populate('Contacts.contactID');
        res.status(200).json(ContactsDoc.Contacts);
    }catch(err){
        console.log(`Error while fetching contacts: ${err}`)
        res.status(500).json({message:"Interval Server Error"})
    }
}

module.exports = fetchContacts;
