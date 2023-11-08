import React, { useState,useEffect } from 'react';
import './Profile.css';
import {useUser } from './UserContext';
const Profile = () => {
    const {userInfo} = useUser();
    const [profileData, setProfileData] = useState();

    useEffect(()=>{
      setProfileData(userInfo);
    },[]);
    
  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', profileData);
  };

  return (
    <div>

    { profileData ?(
    <div className='profile-div'>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={profileData.username}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={profileData.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select
          value={profileData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={profileData.dob}
          onChange={(e) => handleChange('dob', e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          value={profileData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>) : (<p>No user data available</p>)

}
     </div>
  );
};

export default Profile;
