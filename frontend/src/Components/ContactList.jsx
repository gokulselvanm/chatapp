import Navbar from "./Navbar.jsx";
import ListItem from "./ListItem";
import {useEffect,useContext} from "react";
import{userContext} from "../utils/ContextsProvider.jsx";

export default function ContactList({setContactWinOpen}){
    
    const {myContacts, setMyContacts}=useContext(userContext);

    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    useEffect(()=>{

        //fetch the contacts each time this component mounts
        fetch(`${BACKEND_URL}/api/fetchContacts`,{
            method:"GET",
            credentials:"include"
        }).then(async (data)=>{
            const contacts = await data.json();
            setMyContacts(contacts);
        })
    },[])

    return(
        <div className="bg-gray-500 flex flex-col w-full overflow-y-auto w-full h-screen relative">

            <Navbar/>

            {
                myContacts?.map((contact)=>{
                    return <ListItem key={contact._id} user={contact.contactID} />
                })
            }
            <div className="tooltip tooltip-left absolute bottom-3 right-3" data-tip="New Contact">
                <button className="btn btn-lg btn-circle btn-primary text-3xl  "  onClick={()=>setContactWinOpen(true)}> + </button>
            </div>

        </div>
    );
}
