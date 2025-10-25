import Avatar from "./Avatar.jsx";
import {useContext} from "react";
import {userContext} from "../utils/ContextsProvider.jsx";

export default function ListItem({user}){

    const {setSelectedContact, selectedContact}=useContext(userContext);

    return(

        <div className={`${selectedContact?._id===user?._id? "bg-blue-900":"bg-blue-300 hover:bg-blue-400"} h-16 max-h-16border border-gray-400 rounded-md flex flex-row items-center p-3 m-1 flex-0 cursor-pointer`} onClick={()=>{setSelectedContact( user)}} >

        {/*the other user's profile*/}
            <Avatar initials = {user?.username[0]}/>

        {/*their name , and the most recent text they sent*/}
            <div className="mx-4 flex-1"> 
                <p className="font-inter font-semibold text-base">{user?.username}</p>
                <p className="font-inter text-xs text-gray-500" > {user?.email}</p>
            </div>

        {/*the number of images that have been sent

            <div className="rounded-full bg-blue-900 size-[25px] flex items-center justify-center ">
                <p className="text-white font-inter font-bold text-xs">10</p>
            </div>
        */}

        </div>
    );
}
