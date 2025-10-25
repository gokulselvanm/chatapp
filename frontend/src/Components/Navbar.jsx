import Avatar from "./Avatar.jsx";

export default function Navbar(){
    return(
        <div className="navbar bg-base-100 shadow-sm gap-2 sticky top-0 z-1">
            
            {/*app logo*/}
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">ChatX</a>
                </div>

        </div>
    );
}
