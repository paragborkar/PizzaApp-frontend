import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CheckOTP = () => {
    const user =localStorage.getItem("userId");
    const navigate = useNavigate();
    const [otp,setOtp] = useState();
    const [message,setMessage]= useState();
    const [loading,setLoading] = useState(false);
    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
        if (otp === "") {
            setLoading(false);
            alert("Please Enter OTP");
          } else {
              const res = await axios.post("https://pizzaapp-backend-ycpz.onrender.com/api/v1/checkotp", {
                 otpget:otp,
                 id:user
              }).catch((err)=> {
                setLoading(false);
                alert("Something went wrong");
              });
  
              setLoading(false);
              if (res && res.status === 201) {
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
          <button type="submit" disabled={loading}>
            {loading ? <div className="loader"></div> : "Verify OTP"}
          </button>
     </form>
 </section> 
 </div>
  )
}

export default CheckOTP
