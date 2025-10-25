import {useContext,useState,useEffect} from 'react';
import {authContext} from '../App.jsx';
import {Navigate} from 'react-router-dom';

export default function RedirectRoute({children}){

    const [loading,setLoading]=useState(true);
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL; const {isAuthorised,setIsAuthorised}=useContext(authContext); useEffect(()=>{ fetch(`${BACKEND_URL}/auth/verifyauth`,
            {
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"}
            }).then((res)=>{
                if(res.ok){
                    setIsAuthorised(true)
                }else{
                    setIsAuthorised(false)
                }
                setLoading(false);
            }
            )
    },[]);

    //redirects the user to home if authorised, else to the child which this component is wrapped around in the route

    if(loading){
        return(
            <div className=" w-full h-full flex justify-center items-center">
                <span className="loading loading-bars loading-xl "></span>
            </div>
)
    }else{
        return(isAuthorised?<Navigate to="/home" replace />:children)
    }
}
