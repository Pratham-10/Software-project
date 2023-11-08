import React from 'react'; 
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import Layout from './components/Layout';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Demo from './components/Demo';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Provideride from './components/Provideride';
import Profile from './components/Profile';
import { UserProvider} from './components/UserContext';
import Passengerlist from './components/Passengerlist';
import Bookride from './components/Bookride';
import { Rideprovider } from './components/Ridecontext';
import Ridelist from './components/Ridelist';


function App() {
  // useEffect(() => {
	// 	fetch("http://localhost:3300/ride").then((response) => {response.json().then((res)=>{
  //   console.log(res);  
  //   setData(res)
  // })}) 
	// }, []);


  return (
    <div>
     
      <div>
      <BrowserRouter>
      <UserProvider>
        <Rideprovider>      
           
      <div className='nav'>
      <Navbar></Navbar>
    </div>
      <Routes>
     <Route path="/" element={<Login/>}/>
     <Route path="/RegistrationForm" element={<RegistrationForm/>}/>
     <Route path="/Layout" element={<Layout/>}></Route>
    <Route path="/Provideride" element={<Provideride/>}></Route>
    <Route path = "/Demo" element={<Demo/>}></Route>
    <Route path = "/Profile" element={<Profile/>}></Route>
    <Route path = "/Passengerlist" element={<Passengerlist/>}></Route>
    <Route path = "/Bookride" element={<Bookride/>}></Route>
    <Route path = "/Ridelist" element={<Ridelist/>}></Route>
      </Routes>
      </Rideprovider>
      </UserProvider>
      </BrowserRouter>
</div>
    </div>
  );
}

export default App;
