import React, { useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';

const PasswordReset = () => {
    const [email,setEmail] = useState("");
    const [message,setMessage]= useState("");
    const submitHandler = async (e) =>{
        e.preventDefault();
        if (email === "") {
          alert("Please Enter Email");
        } else {
            const res = await axios.post("https://pizzaapp-backend-ycpz.onrender.com/api/v1/sendpasswordlink", {
               email:email
            });


            if (res.status === 201) {
                setEmail("");
                setMessage(true)
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
            {message && <p style={{color:"green"}} >Password Reset Link Sent Successfully</p>}

            <input type="email" name='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email'/>
            <button type="submit">Send</button>
        </form>
    </section> 
    </div>
  )
}

export default PasswordReset
