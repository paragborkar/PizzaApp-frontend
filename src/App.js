import './styles/app.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/layout/Header';
import Contact from './components/Contact';
import Cart from './components/Cart';
import About from './components/About';
import Shipping from './components/Shipping';
import ConfirmOrder from './components/ConfirmOrder';
import PaymentSuccess from './components/PaymentSuccess';
import Login from './components/Login';
import Profile from './components/Profile';
import MyOrders from './components/MyOrders';
import OrderDetails from './components/OrderDetails';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Orders from './components/Orders';
import NotFound from './components/NotFound';
import { useSelector } from 'react-redux';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import CheckOTP from './components/CheckOTP';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    const res=axios.get("https://pizzaapp-backend-ycpz.onrender.com");
  },[]);
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
   <Router>
    <Header/>
    <Routes>
   { isLoggedIn &&
        <>
       <Route path='/' element={<Home/>} />
       <Route path='/contact' element={<Contact/>} />
       <Route path='/cart' element={<Cart/>} />
       <Route path='/about' element={<About/>} />
       <Route path='/shipping' element={<Shipping/>} />
       <Route path='/confirmorder' element={<ConfirmOrder/>} />
       <Route path='/paymentsuccess' element={<PaymentSuccess/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/me' element={<Profile/>} />
       <Route path='/myorders' element={<MyOrders/>} />
       <Route path='/order/:id' element={<OrderDetails/>} />
       <Route path='/admin/dashboard' element={<Dashboard/>} />
       <Route path='/admin/users' element={<Users/>} />
       <Route path='/admin/orders' element={<Orders/>} />
       <Route path='*' element={<NotFound/>} />
      </>
      }
       { !isLoggedIn &&
       <>
          <Route path='/' element={<Login/>} />
          <Route path='/me' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/passwordreset' element={<PasswordReset/>} />
          <Route path='/checkotp' element={<CheckOTP/>} />
          <Route path='/changepassword' element={<ForgotPassword/>} />
          <Route path='*' element={<NotFound/>} />
        </>
       }
     </Routes>
    </Router>
  );
}

export default App;


