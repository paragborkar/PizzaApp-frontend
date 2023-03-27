import React, { useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {authActions} from '../redux/index.js';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) =>{
    e.preventDefault();
    if(isSignup){
      sendAuthRequest(true,inputs).then((data)=>{localStorage.setItem("userId",data.user._id);alert("Signup Successful.Please Login")}).catch((err)=>{alert("User Already Exists.")});

    }else{
      sendAuthRequest(false,inputs).then((data)=>{localStorage.setItem("userId",data.user._id);localStorage.setItem("name",data.user.name);localStorage.setItem("role",data.user.role);}).then(()=>{dispatch(authActions.login());}).then(()=>navigate("/")).catch((err)=>{alert("Invalid Username Or Password")});
    }

  }
  const handleChange = (e) =>{
    setInputs((prevState)=>({...prevState,
      [e.target.name]: e.target.value
    }
    ));
  }
  const sendAuthRequest = async (signup,data) =>{
  const res = await axios.post(`https://pizzaapp-backend-ycpz.onrender.com/api/v1/${signup?"signup":"login"}`,{
    name:data.name? data.name:"",
    email:data.email,
    password:data.password
  }).catch((err)=>{console.log(err)});
    const resData = await res.data;
    return resData;
  }
  const [isSignup,setisSignup]=useState(true);
  const [inputs,setInputs] = useState({name:"",email:"",password:""})
  return (
    <div>
       <section className='login'>
        <form onSubmit={submitHandler} >
            <h2>{isSignup?"Signup":"Login"}</h2>
           {isSignup && <input type="text" name='name' onChange={handleChange} value={inputs.name} placeholder='Name' />} 
            <input type="email" name='email' onChange={handleChange} value={inputs.email} placeholder='Email'/>
            <input type="password" name='password' onChange={handleChange} value={inputs.password} placeholder='Password'/>
            <button type="submit">{!isSignup?"Login":"Signup"}</button><br/>
            <Link to='/passwordreset' ><p style={{color:"blue"}} >FORGOT PASSWORD?</p></Link><br/>
            <p onClick={()=>{setisSignup(!isSignup)}} >Change To {isSignup?"Login":"Signup"}</p>
        </form>
    </section>
    </div>
  )
}

export default Login;
