import React, { useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useUser} from './UserContext';
import './Login.css';

const Login = () => {
  const [usernamein, setUsernamein] = useState('');
  const [passwordin, setPasswordin] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useUser();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`http://localhost:3300/userdetail/${usernamein}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const dataarray = await response.json();
      const data = dataarray.length > 0 ? dataarray[0] : null;
  
      if (data && data.password === passwordin) {
        await setUserInfo(data);
        navigate('/Layout');
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Provide valid details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleloginKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("pass",passwordin);
      console.log(usernamein);
        handleLogin();
    }
};

useEffect(() => {
    document.addEventListener('keydown', handleloginKeyPress);
    return () => {
        document.removeEventListener('keydown', handleloginKeyPress);
    };
}, []);
  return (
   
    <div className='final'>
      <h2>Login</h2>
      <label>Username: </label>
      <input type="text" value={usernamein} onChange={(e) => {setUsernamein(e.target.value)}} />

      <label>Password: </label>
      <input type="password" value={passwordin} onChange={(e) => {setPasswordin(e.target.value)}} />

      {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}

      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className='account'>
        Don't have an account?{' '}
        <div className='regis-button'>
        <Link to="/RegistrationForm">
          <button>Register</button>
        </Link>
        </div>
        
      </p>
    </div>
    
  );
};

export default Login;
