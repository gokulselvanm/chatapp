const router = require('express').Router();
const verifyJWT=require('../utils/verifyJWT.js');
const sendUserDetails = require('../Controllers/sendUserDetails.js');
const addNewContact = require('../Controllers/addNewContact.js');
const fetchContacts = require('../Controllers/fetchContacts.js');
const fetchMessages = require('../Controllers/fetchMessages.js');

//api endpoint to get the details about the user
router.get('/me',verifyJWT,sendUserDetails);

router.put('/addNewContact/:email',verifyJWT,addNewContact);

router.get('/fetchContacts',verifyJWT,fetchContacts);

router.get('/fetchMessages/:contactID',verifyJWT,fetchMessages);


module.exports = router;
