import Avatar from "./Avatar.jsx";
import hamburger from "../assets/hamburger.svg";
import {useContext} from "react";
import {userContext} from "../utils/ContextsProvider.jsx";

export default function MessageTopBar(){

    const {selectedContact} = useContext(userContext);
    return(
        <div className="navbar flex bg-base-100 shadow-sm justify-between px-6 items-center ">

        {/*the other user's profile*/}
            <Avatar initials={selectedContact ?selectedContact.username[0]:'-'}/>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{selectedContact?.username}</legend>
                <p className="label">{selectedContact?.email}</p>
            </fieldset>

        {/*settings for that chat
            <button className="btn btn-square btn-ghost">
                <img src={hamburger} height="30px" width="30px" ></img>
            </button>
*/}

        </div>
    );
}
