import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {

    const {id,token} = useParams();
    const navigate = useNavigate();

    const [password,setPassword] = useState("");
    const [message,setMessage]= useState("");
    const submitHandler = async (e) =>{
        const currentDate = new Date().toJSON().slice(0, 10);
        console.log(currentDate);
        e.preventDefault();
        if (password === "") {
           alert("Please Enter Password");
        } else if (password.length < 6) {
           alert("Password Length Must Be Greater Than 6 Characters.")
        } else {
            const res = await axios.post(`https://pizzaapp-backend-ycpz.onrender.com/api/v1/${id}/${token}`, {
               password:password,
               time:currentDate
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
        const res = await axios.get(`https://pizzaapp-backend-ycpz.onrender.com/api/v1/forgotpassword/${id}/${token}`);

        
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
         <h2>Enter New Password</h2>
         {message && <p style={{color:"green"}} >Password Reset Successfully</p>}

         <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Email'/>
         <button type="submit">Send</button>
     </form>
 </section> 
 </div>
  )
}

export default ForgotPassword
