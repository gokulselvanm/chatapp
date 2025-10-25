import {useContext,useState,useEffect} from 'react';
import {authContext} from '../App.jsx';
import {Navigate} from 'react-router-dom';


const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
export default function ProtectedRoute({children}){

    const [loading,setLoading]=useState(true);

    const {isAuthorised,setIsAuthorised}=useContext(authContext);
    //redirects the user to login if not authorised, else to the child which this component is wrapped around in the route
    useEffect(()=>{
        fetch(`${BACKEND_URL}/auth/verifyauth`,
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

    if(loading){
        return(
            <div className=" w-full h-full flex justify-center items-center">
                <span className="loading loading-bars loading-xl "></span>
            </div>
        );
    }else{

        return(
            isAuthorised?children:<Navigate to="/login" replace />
        )

}
    
}
