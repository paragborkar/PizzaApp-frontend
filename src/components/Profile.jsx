import React from 'react';
import '../styles/profile.scss';
import profile from '../assets/Profile.png';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { authActions } from '../redux/index.js';

const Profile = () => {
    const dispatch = useDispatch();
    const user =localStorage.getItem("name");
    const role=localStorage.getItem("role");
    const [loading, setLoading] = React.useState(false);

    const logoutHandler = () => {
      setLoading(true);
      setTimeout(() => {
        dispatch(authActions.logout());
        setLoading(false);
      }, 1000);
    };
  return (
   <section className='profile' >
    <main>
        <img  src={profile}  alt="Not Found" />
        <h5> {user} </h5>

       { role === "admin" &&
          (
            <div>
            <Link  to='/admin/dashboard' >Dashboard</Link>
            </div>
          )
       }
        <div>
            <Link  to='/myorders' >Orders</Link>
        </div>
        <button onClick={logoutHandler} disabled={loading}>
          {loading ? <div className="loader"></div> : "Logout"}
        </button>
    </main>
   </section>
  )
}

export default Profile

