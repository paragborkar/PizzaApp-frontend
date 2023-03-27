import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {


    const navigate = useNavigate();
    const user =localStorage.getItem("userId");
    const [password,setPassword] = useState("");
    const [message,setMessage]= useState("");
    const submitHandler = async (e) =>{
        e.preventDefault();
        if (password === "") {
           alert("Please Enter Password");
        } else if (password.length < 6) {
           alert("Password Length Must Be Greater Than 6 Characters.")
        } else {
            const res = await axios.post(`http://localhost:5000/api/v1/changepassword`, {
               password:password,
               id:user
            });


            if (res.status === 201) {
                setPassword("")
                setMessage(true)
            } else {
             alert("Token Expired");
            }
        }
    }

    const userValid = async () => {
        const res = await axios.post(`http://localhost:5000/api/v1/changepassword`);

        
        if (res.status === 201) {
            console.log("user valid")
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        userValid();
    },);
  return (
    <div>
    <section className='login'>
     <form onSubmit={submitHandler} >
         <h2>New Password</h2>
         {message && <p style={{color:"green"}} >Password Reseted</p>}

         <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='New Password'/>
         <button type="submit">Send</button>
     </form>
 </section> 
 </div>
  )
}

export default ForgotPassword
