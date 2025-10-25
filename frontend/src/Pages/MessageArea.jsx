import Texts from "../Components/Texts.jsx";
import TextBar from "../Components/TextBar.jsx";
import MessageTopBar from "../Components/MessageTopBar.jsx";
import {useContext, useEffect } from "react";
import {userContext} from "../utils/ContextsProvider.jsx";

export default function MessageArea(){
    const {messages,setMessages, selectedContact} = useContext(userContext);
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

    useEffect(()=>{

        //whenever this component is loaded, fetch all the messages of the user with the selected contacts 
        if(selectedContact){
            fetch(`${BACKEND_URL}/api/fetchMessages/${selectedContact._id}`,
                {
                    method:"GET",
                    credentials:"include"
                })
                .then((data)=>{
                    data.json()
                        .then((messages)=>{
                            setMessages(messages);
                        })
                })
        }

    },[selectedContact])

    return(
        <div className="flex flex-col h-screen w-full">
        <MessageTopBar/>
        <Texts/>
        <TextBar/>
        </div>
    );
}
