import Button from "./Button";
import { useEffect } from "react";
import './Layout.css'
import {useUser} from './UserContext';
import {useNavigate} from 'react-router-dom';
const Layout = () => {
  const navigate = useNavigate();
  const navigatetoprovide =()=>{
      navigate('/Provideride');
  }
  
  const navigatetobook = () => {
  navigate('/Bookride');
  }
    const {userInfo} = useUser();
  useEffect(()=>{
    console.log("context data:",userInfo);
  },[userInfo])
  return (
    <>
    <div className="layout">
    <div className="centered-container-provide">
      <button  onClick={navigatetoprovide} className="centered-button-provide">Provide a ride</button>

    

      </div>
      <div className="centered-container-book">
      <button onClick={navigatetobook} className="centered-button-book">Book a ride</button>
    </div> 
    </div>
     </>

  )
};

export default Layout;