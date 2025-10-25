import Logo from "../assets/Logo.svg";
import {useNavigate,Link} from "react-router-dom";
import GoogleButton from "../Components/GoogleButton.jsx";
import {useState} from "react";

export default function Registration(){


const navigate=useNavigate();
    const [isSecondStage,setIsSecondStage]=useState(false);
  const [value, setValue] =useState("");
function handleSubmit(e){

    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

    e.preventDefault();
    const formData=new FormData(e.target);
    if(formData.get('otp')){
        fetch(`${BACKEND_URL}/auth/verifyotp`,
            {
                method:'POST',
                credentials:'include',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    email:formData.get('email'),
                    otp:formData.get('otp')
                })
            }).then((res)=>{
                if(res.ok){
                    navigate('/login');
                }else{
                    navigate('/signup');
                }
            }).catch((err)=>{
                console.log(err);
            })

    }else{

    fetch(`${BACKEND_URL}/auth/signup`,
        {
            method:'POST',
            credentials:'include',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                username:formData.get('username'),
                password:formData.get('password'),
                email:formData.get('email')
            })
        }).then(
            (res)=>{
                if(res.ok){
                    //SHOW OTP BOX AND DISABLE EVERYTHING ELSE
                    setIsSecondStage(true);
                }else{
                    navigate('/signup');
                }
            }
        ).catch(
            (err)=>{
                console.log(err);
                navigate('/signup');
            }
        )
    }

}


    return(
        <div className="flex flex-col items-center justify-center h-screen bg-[#E2EDF5]">
        {/*container containing the entire page */}
        {/*Disabling form elements makes it so that the details arent sent to the function on submit*/}
        {/*so Making it readOnlly when waiting for the OTP and enabling the OTP box*/}
        {/*if not waiting for OTP,make all the form elements editable and hiding the otp element*/}

            {/*logo*/}
            <img src={Logo} className="size-[100px]"></img>
            <div className="flex flex-col items-center w-[80%] max-w-[500px] justify-center">
            {/*contains all the things for registration*/}

                {/*wraps the classic registration page containing username, email and password,along with a submit button*/}
                <form className="flex flex-col items-center justify-center gap-3 m-2 w-[80%] max-w-[500px]" onSubmit={handleSubmit} >
                    <input type="text" className="input w-full" required placeholder="Username" name="username" readOnly={isSecondStage} />
                    <input className="input validator w-full" type="email" required placeholder="mail@site.com" name="email" readOnly={isSecondStage} />
                    <input type="password" className="input w-full" required placeholder="Password" name="password" readOnly={isSecondStage} />

                    {/*OTP box*/}
                    <input type="text" name="otp" placeholder="Your OTP..." className={`input m-3 w-[80%] ${!isSecondStage?"hidden":""}` } />

                    <input type="submit" value="Submit" className="btn w-full bg-blue-500" />
                </form>

                {/*//for the ----or----*/}
                <div className="divider">OR</div>
                {/*//for continuing the registration/login using google Oauth*/}
                <GoogleButton/>
                <Link to="/login" className="link link-primary">Already have an Account? Login</Link>
            </div>

        </div>

    )
}
