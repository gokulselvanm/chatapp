import { createContext, useRef, useState } from "react";

export const userContext= createContext();

export default function ContextsProvider({children}){

    //to store the user's information
    const myInfoRef = useRef(null);
    //to store the socket used to connect with backend
    const socketRef = useRef(null);
    //to store the messages with the current user
    const [messages, setMessages] = useState([]);
    //to know what the contact selected by the user is, (for fetching messages and deciding whom to send the message)
    const [selectedContact, setSelectedContact] = useState();
    //store all contacts of the user and update the page when contacts change
    const [myContacts,setMyContacts] = useState([]);

    return(
        <>

        <userContext.Provider value={{ myInfoRef, socketRef, messages, setMessages, selectedContact, setSelectedContact, myContacts, setMyContacts}} >
            {children}
        </userContext.Provider >

        </>
    )

}
