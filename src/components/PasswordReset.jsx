import React, { useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {

    const [email,setEmail] = useState("");
    const [message,setMessage]= useState("");
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
        if (email === "") {
          alert("Please Enter Email");
        } else {
            const res = await axios.post("https://pizzaapp-backend-ycpz.onrender.com/api/v1/sendotp", {
               email:email
            }).catch((err)=>{
              setLoading(false);
              alert("Something went wrong");
            });

            setLoading(false);
            if (res && res.status === 201) {
                console.log(res);
                localStorage.setItem("userId",res.data.userfind._id);
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
             <button type="submit" disabled={loading}>
                 {loading ? <div className="loader"></div> : "Send OTP"}
             </button>
        </form>
    </section> 
    </div>
  )
}

export default PasswordReset
