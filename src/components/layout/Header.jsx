import React, { useEffect, useState } from 'react';
import {GiFullPizza} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import {FiShoppingCart,FiLogIn} from 'react-icons/fi';
import {FaUser} from 'react-icons/fa';
import '../../styles/header.scss';
import { useSelector } from 'react-redux';


const Header = () => {
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const {
        cartItems: {
          paneerPizza: { quantity: paneerPizza },
          cheesePizza: { quantity: cheesePizza},
          capsicumPizza: { quantity:capsicumPizza },
        }
      } = useSelector((state) => state.cart);
      const [item,setItem]=useState(0);
      useEffect(()=>{
        setItem(paneerPizza+cheesePizza+capsicumPizza);
      },[paneerPizza,cheesePizza,capsicumPizza])
  return (
    <nav>
        <div style={{fontSize:"30px"}}>
        <GiFullPizza/><p style={{marginTop:"0.8rem"}}>PizzaApp</p>
        </div>
        <div>
           {isLoggedIn &&
            <>
             <Link to='/'>Home</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/about'>About</Link>
            <Link to='/cart' ><span style={{color:"white"}} className='shoppingcart'>{item}</span><FiShoppingCart/></Link>
            </>
           }
            <Link to={isLoggedIn?"/me":"/login"}>
            {isLoggedIn?<FaUser/>:<FiLogIn/>}
            </Link>
        </div>
    </nav>
  )
}

export default Header
