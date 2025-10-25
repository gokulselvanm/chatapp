import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import RedirectRoute from "./utils/RedirectRoute.jsx";
import ContextsProvider from "./utils/ContextsProvider.jsx";
import {Navigate} from 'react-router-dom';

import {createContext,useState} from 'react';


export const authContext=createContext();

export function App(){

    const [isAuthorised,setIsAuthorised]=useState(false);

    return(
        <div className="relative h-screen w-screen">
            <authContext.Provider value={{isAuthorised,setIsAuthorised}}>
                <ContextsProvider>
                    <BrowserRouter>
                        <Routes>

                            <Route path="/" element=<Navigate to="/login" replace /> />
        
                            <Route path="/login" element=<RedirectRoute><Login/></RedirectRoute>/>

                            <Route path="/signup" element=<RedirectRoute><Registration/></RedirectRoute>/>

                            <Route path="/home" element=<ProtectedRoute><Home/></ProtectedRoute>/>

                        </Routes>
                    </BrowserRouter>
                </ContextsProvider>
            </authContext.Provider>
        </div>
    );
}
