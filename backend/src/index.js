const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const socketio=require('socket.io');
const http=require('http');
const verifyJWTInSocket=require('./utils/verifyJWTInSocket.js');
const Contact = require("./DB/Contact.js");
const User = require("./DB/User.js");
const Message = require("./DB/Message.js");

const authRoutes=require('./Routes/auth.js');
const utilRoutes=require('./Routes/utils.js');

//to access all data in environment variable
require('dotenv').config();

    require('./DB/connection.js');

const frontendURL = process.env.FRONTEND_URL;

const app=express();
//Making a http server using the express app
const server=http.createServer(app);
//Making a SocketIO server using the http server so that both the express and the socketio server are on the same port
const io=new socketio.Server(server,
    {
        cors:{
            origin:frontendURL,
            methods:["GET","POST"],
            credentials:true
        }
    }
);


//cross origin resource sharing, for sharing cookies/headers etc, because frontend is on different port
app.use(cors({origin:frontendURL,credentials:true}));
//parse cookie to an object and mount it to request object
app.use(cookieParser());
//parse json to js object and mount it to request object
app.use(express.json());
//for form data
app.use(express.urlencoded({extended:true}));


//Test if server is working
app.get('/test',(req,res)=>{
    res.send("<h1>Server is running</h1>");
})

//all routes for authentication and authorisation 
app.use('/auth',authRoutes);

app.use('/api',utilRoutes);

//SOCKETS

//middleware that runs before any of the events of socket
io.use(verifyJWTInSocket);
let socketIDMap= {};

//when User Connects to the server
io.on("connection",(socket)=>{

    //map the userID(that we set,corresponding to the ID in the database) to the socketID for each connection
    socketIDMap[socket.user.id]=socket.id;

    //console.log(socket.id);//this changes every time

    //console.log(socket.handshake.auth.usrID);//this is the ID set by client side

    //Making a Contact list if it already doesnt exist
    Contact.findOne({userID:socket.user.id}).
        then((existing)=>{
            if(!existing){
                new Contact({
                    userID:socket.user.id,
                }).save();
            }
        })
/*
    socket.on("add-contact",async (data)=>{


    })
*/

    socket.on("send-message",async (message)=>{
        //socket.broadcast.emit("receive-message",message);//to all other sockets except the sender

        const usrContacts= await Contact.findOne({userID:socket.user.id}).populate('Contacts.conversationID');//getting all the contacts of that user

        const existingContact= usrContacts.Contacts.find(contactDoc=>contactDoc.contactID.toString()===message.receiver.toString())//normal JS function
        /*if(existingContact){
            existingContact.messages.push(message);//existingContact gotten from .find method is actually a reference and the changes made to it and saved will be reflected in the mongoDB database if the original object queried from mongoDB is saved using .save()
        }else{
        }*/

        //contact will always exist and so does the conversation
        const newMessage = await new Message({
            sender:message.sender,
            receiver:message.receiver,
            content:message.content,
        }).save();
        const convo = existingContact.conversationID;//since conversationID is ref, we need to first do this, to push the newMessage._id inside the actual conversation model
        convo.messages.push(newMessage._id);
        await convo.save();//since no change is being done to the usrContacts , rather new message is being added to the Conversation Document , hence we need to save that,ref to the conversation remains same
        //await usrContacts.save();



        if(newMessage.receiver.toString()!=newMessage.sender.toString()){//just message.receiver !== message.sender works but newMessage.receiver!==newMessage.sender doesnt work, since they are object references and you need to add .toString() if you want to really compare them

            socket.emit("receive-message",newMessage);//sending message to the socket that sent the message
            //incase the user sends message to themselves
            io.to(socketIDMap[message.receiver]).emit("receive-message",newMessage);//sending message to the socket specified by the sender
        }else{

            //console.log("hate this")
            io.to(socketIDMap[message.receiver]).emit("receive-message",newMessage);//sending message to the socket specified by the sender
        }
    })

    //when socket disconnects, delete it form the map
    socket.on("disconnect",
    ()=>{
        if(socketIDMap[socket.user.id]) delete socketIDMap[socket.user.id]
    }
    )
})

//exposing the server to a port
const PORT=process.env.PORT;
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);

    //establishing connection with the database

})

