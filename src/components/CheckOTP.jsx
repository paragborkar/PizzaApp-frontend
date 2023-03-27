import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CheckOTP = () => {
    const user =localStorage.getItem("userId");
    const navigate = useNavigate();
    const [otp,setOtp] = useState();
    const [message,setMessage]= useState();
    const submitHandler = async (e) =>{
        e.preventDefault();
        if (otp === "") {
            alert("Please Enter OTP");
          } else {
              const res = await axios.post("http://localhost:5000/api/v1/checkotp", {
                 otpget:otp,
                 id:user
              });
  
  
              if (res.status === 201) {
                  setOtp("");
                  setMessage(true)
                  navigate("/changepassword");
              } else {
                 alert("Invalid Data");
              }
          }
    }
  return (
    <div>
    <section className='login'>
     <form onSubmit={submitHandler} >
         <h2>OTP Validation</h2>
         {message && <p style={{color:"green"}} >OTP Verified</p>}

         <input type="text" name='otp' onChange={(e)=>setOtp(e.target.value)} value={otp} placeholder='Enter OTP'/>
         <button type="submit">Send OTP</button>
     </form>
 </section> 
 </div>
  )
}

export default CheckOTP
