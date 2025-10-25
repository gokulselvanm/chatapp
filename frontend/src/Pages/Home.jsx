import { useState, useEffect, useContext} from "react";
import {io} from "socket.io-client";
import Sidebar from "../Components/Sidebar.jsx";
import ContactList from "../Components/ContactList.jsx";
import MessageArea from "./MessageArea.jsx";
import {userContext} from "../utils/ContextsProvider.jsx";
import SelectNewUser from "../Components/SelectNewUser.jsx";

export default function Home(){

    //to decide if the window used to add new contact should be open or not
    const [contactWinOpen,setContactWinOpen] = useState(false);
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

    const { myInfoRef, socketRef,messages, setMessages } = useContext(userContext);

    //add the incoming messages to the state
    function handleReceive(message){

        setMessages(
            (prevMsgs)=>{
                return [...prevMsgs,message]
            }
        )
    }


    useEffect(
        ()=>{

            //get the credentials of the current user to store in the ref and the current socket object
            fetch(`${BACKEND_URL}/api/me`,{
                method:"GET",
                credentials:"include"
            })
            .then(
                async (usrData)=>{

                    myInfoRef.current = await usrData.json();

                    //connecting to socket with custom ID called usrID, same as the id in mongoDB
                    socketRef.current = io(BACKEND_URL,{auth:{usrID:myInfoRef.current.id},withCredentials:true});
                    //mounting only the user name to the socket object
                    socketRef.current.usrID=myInfoRef.current.id;

                    //nothing is being done on connect
                    socketRef.current.on("connect",()=>{})//cant get usrID using socket in frontend


                    socketRef.current.on("receive-message",handleReceive);

                }
            ).catch(
                (err)=>{
                    console.log("Error fetching user data",err)
                }
            )

            return ()=>{
                socketRef.current?.disconnect();
                socketRef.current?.off("receive-message",handleReceive);//not really needed as the socket itself has disconnected,but it is fine
            }
        },
        []//Runs only once on mount, and not during any rerenders
    )



    return(
        <div className="flex flex-row max-w-screen overflow-x-clip ">{/*Covers the entire Home*/}
            <Sidebar/>
            {contactWinOpen?<SelectNewUser setContactWinOpen={setContactWinOpen}/> : <ContactList setContactWinOpen={ setContactWinOpen } />}
            <MessageArea/>
        </div>
    );
}
