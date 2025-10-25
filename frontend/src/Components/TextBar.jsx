import paperclip from "../assets/paperclip.svg";
import sendButton from "../assets/sendButton.svg";
import { useRef,useContext } from "react";
import { userContext } from "../utils/ContextsProvider.jsx";

export default function TextBar(){
    const messageRef = useRef(null);

    const { socketRef,userRef, selectedContact }=useContext(userContext);

    async function sendMessage(){

        const content = messageRef.current.value;
        const sender = socketRef.current.usrID; // or userRef.current.id
        const receiver = selectedContact._id; //id of the user according to DB
        const message = { 
            content : content,
            sender : sender,
            receiver : receiver 
        }
        socketRef.current.emit("send-message",message);
        //dont need to convert it to JSON, websockets do that under the hood unlike in http requests where we need to send JSON strings

        //empty the text bar
        messageRef.current.value = "";
    }

    return(

        <div className="w-full flex flex-row p-3 gap-2 items-center ">
        
        {/*place to type*/}
              <input type="text" placeholder="Type here" className=" input w-full py-5" ref={messageRef}/>

        {/*Send button*/}
              <button className="btn btn-lg btn-circle btn-primary p-1 " onClick={sendMessage}> 
                <img src={sendButton}></img>
            </button>

        {/*paper clip(for files and media, etc)
              <button className="btn btn-lg btn-circle btn-primary p-2 ">
                <img src={paperclip} ></img>
            </button>
        */}
        </div>

    )
}
