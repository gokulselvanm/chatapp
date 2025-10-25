import ChatBubble from "./ChatBubble.jsx";
import {useContext,useRef,useEffect} from "react";
import {userContext} from "../utils/ContextsProvider.jsx";

export default function Texts(){


    const {messages, socketRef, selectedContact} = useContext(userContext);

    return(
        <div className="overflow-y-auto grow">

        {

            messages.filter((message)=>{
                if(selectedContact._id.toString() !==socketRef.current.usrID.toString())//if the selected contact is not the user itself
                {
                    return ((message.sender.toString() === selectedContact._id.toString() || message.receiver.toString() === selectedContact._id.toString())&& !(message.sender.toString() === selectedContact._id .toString()&& message.receiver.toString() === selectedContact._id.toString()))//XOR gate operations when the selected user is not the user itself
                    //when (sender = selected contact or receiver = selected Contact) AND not(sender = selected contact and receiver = selected contact)
                }
                else
                {
                    //when the selected contact is the user themselves
                    //when sender = selected contact and receiver = selected contact (only possible when the user has selected theirselves' contacts)
                    return message.sender.toString() === selectedContact._id.toString() && message.receiver.toString() === selectedContact._id.toString()
                }
            })
            .map(
                (message)=>{
                return <ChatBubble key={ message._id } sending={message.sender===socketRef.current.usrID} content={message.content}/>
            })


        }

        </div>
    );
}
