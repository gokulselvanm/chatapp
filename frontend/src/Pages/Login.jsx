import GoogleButton from "../Components/GoogleButton.jsx";
import Logo from "../assets/Logo.svg";
import {useNavigate,Link} from "react-router-dom";




export default function Login(){

    //has to be within component and not in normal function
const navigate=useNavigate();

function handleSubmit(e){

    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    //preventing refresh
    e.preventDefault();

    //so that we can use .get
    const formData=new FormData(e.target);
    fetch(`${BACKEND_URL}/auth/login`,
        {
            method:'POST',
            credentials:'include',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:formData.get('email'),
                password:formData.get('password')
            })
        }).then(
            (res)=>{
                //if logged in, redirect to home
                if(res.ok){
                    navigate('/home')
                }
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
}







    return(
        <div className="flex flex-col items-center justify-center h-screen bg-[#E2EDF5]">
        {/*container containing the entire page */}

            {/*logo*/}
            <img src={Logo} className="size-[100px]"></img>

            {/*contains all the things for login*/}
            <div className="flex flex-col items-center w-[80%] max-w-[500px] justify-center">

                {/*wraps the classic login page containing email and password,along with a submit button*/}
                <form className="flex flex-col items-center justify-center gap-3 m-2 w-[80%] max-w-[500px]"  onSubmit={handleSubmit} >
                    <input className="input validator w-full" type="email" name="email" required placeholder="mail@site.com" />
                    <input type="password" className="input w-full" name="password" required placeholder="Password" />
                    <input type="submit" value="Submit" className="btn w-full bg-blue-500" />
                </form>

                {/*//for the ----or----*/}
                <div className="divider">OR</div>
                {/*//for continuing the registration/login using google Oauth*/}
                <GoogleButton/>
                <Link to="/signup" className="link link-primary">Dont have an Account? Signup</Link>
            </div>
        </div>
    );
}
