import Avatar from "./Avatar.jsx";
import SettingsIcon from "../assets/Settings.svg";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {userContext} from "../utils/ContextsProvider.jsx";
import logoutIcon from "../assets/logoutIcon.svg";

export default function Sidebar(){

    const {myInfoRef} = useContext(userContext);
    const navigate=useNavigate();
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

    function logout(){
        fetch(`${BACKEND_URL}/auth/logout`,
            {
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"}
            }).then(()=>{navigate('/login')})
    }

    return(
        <div className="flex flex-col justify-start items-center p-3 gap-5 bg-gray-200 rounded-md h-screen w-[60px]">

        {/*for your profile*/}
        {/*        <div className="tooltip tooltip-right" data-tip="Profile">*/}
        {/*            <button className="cursor-pointer">*/}
                            <Avatar initials={myInfoRef.current?.username[0]} />
        {/*             </button>*/}
        {/*        </div>*/}


        {/* settings button
            <div className="tooltip tooltip-right" data-tip="Settings">
                <button className="cursor-pointer">
                    <img src={SettingsIcon} height="40px" width="40px" className="bg-gray-300 hover:bg-gray-400 p-2 rounded-full"></img>
                </button>
            </div>

*/}
        {/*Logout button*/}
<div className="tooltip tooltip-right" data-tip="logout">
        <button className=" bg-red-400 hover:bg-red-500 rounded-sm flex items-center justify-center p-1.5 " onClick={logout}>
        <img src={logoutIcon} />
        </button>
        </div>
        </div>
    );
}
