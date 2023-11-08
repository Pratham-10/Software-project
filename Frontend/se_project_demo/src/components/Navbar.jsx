import React from 'react';
import { useLocation,Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const navigate = useNavigate();



  const location = useLocation();
  const isLoginRoute = location.pathname === '/';
  const isRegisterRoute = location.pathname === '/RegistrationForm';

  const shouldRenderNavbar = !isLoginRoute && !isRegisterRoute;


  const signup = ()=>{
    navigate('/RegistrationForm');
  }
  
  return shouldRenderNavbar ? (
    <nav className="navbar">
      <div className='symbol'>
        symbol

      </div>
      <div className='home'>
      <Link to="/home">Home</Link>
      </div>

      <div className='about'>
      <Link to="/about">About</Link>
      </div>
    
    <div className='profile'>
    <Link to="/profile">Profile</Link>
    </div>
    
    <div className='signin'>
    <button >sign in</button>
    </div>
   
   <div className='signup'>
   <button onClick={signup}>sign up</button>
   </div>
   
    
  </nav>
  
  ) : null;
};

export default Navbar;
