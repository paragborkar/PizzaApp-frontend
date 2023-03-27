import React, { useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {

    const [email,setEmail] = useState("");
    const [message,setMessage]= useState("");
    const navigate = useNavigate();
    const submitHandler = async (e) =>{
        e.preventDefault();
        if (email === "") {
          alert("Please Enter Email");
        } else {
            const res = await axios.post("http://localhost:5000/api/v1/sendotp", {
               email:email
            });
            console.log(res);
            localStorage.setItem("userId",res.data.userfind._id);
            if (res.status === 201) {
                setEmail("");
                setMessage(true);
                navigate("/checkotp");
            } else {
               alert("Invalid Data");
            }
        }
    }
  return (
    <div>
       <section className='login'>
        <form onSubmit={submitHandler} >
            <h2>Reset Password</h2>
            {message && <p style={{color:"green"}} >OTP Sent Successfully</p>}

            <input type="email" name='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email'/>
            <button type="submit">Send OTP</button>
        </form>
    </section> 
    </div>
  )
}

export default PasswordReset
