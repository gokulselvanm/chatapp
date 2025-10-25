import Navbar from "./Navbar.jsx";
import cross from "../assets/cross.svg";
import {useState,useContext} from "react";
import {userContext} from "../utils/ContextsProvider.jsx";

export default function SelectNewUser({setContactWinOpen}){

    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    const [contactEmail,setContactEmail] = useState('');
    const {setMyContacts} = useContext(userContext);

    async function addNewUser(){

        const res = await fetch(`${BACKEND_URL}/api/addNewContact/${contactEmail}`,{
            method:"PUT",
            credentials:"include"
        })
        setContactWinOpen(false);
    }

    return(
        <div className="bg-gray-500 flex flex-col w-full overflow-y-auto w-full h-screen relative">

            <Navbar/>

            <button className="btn btn-circle btn-error m-3" onClick={()=>setContactWinOpen(false)}>
                <img src={cross}></img>
            </button>

            <fieldset className="fieldset mx-auto my-auto ">{/*mx-auto my-auto to automatically align them center ml-auto,in that auto means it automatically takes everything available for it for the margin ,on the left*/}

                <legend className="fieldset-legend">Type the User Email</legend>

                <div className="flex flex-row gap-1">

                <input type="text" className="input" placeholder="Type here" value={contactEmail} onChange={(e)=>{setContactEmail(e.target.value)}}/>

                {/*Add User Button*/}
                <button className="btn btn-lg bg-gray-1000 size-10 text-3xl" onClick={addNewUser} > 
                    +
                </button>

                </div>

            </fieldset>

        </div>
    )
}
