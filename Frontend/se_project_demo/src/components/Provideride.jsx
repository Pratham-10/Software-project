import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Provideride.css';
import { useUser } from "./UserContext";

const Provideride = () => {
    const [islicence, setlicence] = useState('');
    const [isseat, setseat] = useState('');
    const [iscarno, setcarno] = useState('');
    const [iscarname, setcarname] = useState('');
    const [iscartype, setcartype] = useState('');
    const [ischarge, setcharge] = useState('');
    const [isfrom, setfrom] = useState('');
    const [isto, setto] = useState('');

    const {userInfo} = useUser();
    

    const [errors, setErrors] = useState({
        licence: '',
        seat: '',
        carno: '',
        carname: '',
        cartype: '',
        charge: '',
        from: '',
        to: '',
    });
    
 
    const navigate = useNavigate();

    const handleride = () => {
        const newErrors = {
            licence: islicence ? '' : 'Please enter your driving licence.',
            seat: isseat ? '' : 'Please select the available seat.',
            carno: iscarno ? '' : 'Please enter the car number.',
            carname: iscarname ? '' : 'Please enter the car name.',
            cartype: iscartype ? '' : 'Please select the car type.',
            charge: ischarge ? '' : 'Please enter the charge per km.',
            from: isfrom ? '' : 'Please enter the starting location.',
            to: isto ? '' : 'Please enter the destination location.',
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== '')) {
            return;
        }
        const ridedetail = { 
            licence: islicence,
            seat: isseat,
            carno: iscarno,
            carname: iscarname,
            cartype: iscartype,
            charge: ischarge,
            from: isfrom,
            to: isto,
            driver_username: userInfo.username,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ridedetail)
        };

        fetch("http://localhost:3300/ridedetails", requestOptions)
        .then((res) => {
          console.log("resse",res);
      
        navigate('/Passengerlist');
        
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleride();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    return (
        <div className="licence-container">
            <div className="detail-licence">
                <label>Driving licence: </label>
                <input type="text" value={islicence} onChange={(e) => { setlicence(e.target.value) }} required />
                <div className="error-message">{errors.licence}</div>
            </div>

            <div className="detail">
                <label>Available seat: </label>
                <select value={isseat} onChange={(e) => { setseat(e.target.value) }} required>
                    <option value="">Select seat</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className="error-message">{errors.seat}</div>
            </div>

            <div className="detail">
                <label>Car No. :</label>
                <input type="text" value={iscarno} onChange={(e) => { setcarno(e.target.value) }} required />
                <div className="error-message">{errors.carno}</div>
            </div>

            <div className="detail">
                <label>Car Name:</label>
                <input type="text" value={iscarname} onChange={(e) => { setcarname(e.target.value) }} required />
                <div className="error-message">{errors.carname}</div>
            </div>

            <div className="detail">
                <label>Car Type:</label>
                <select value={iscartype} onChange={(e) => { setcartype(e.target.value) }} required>
                    <option value="">Select car type</option>
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                </select>
                <div className="error-message">{errors.cartype}</div>
            </div>

            <div className="detail">
                <label>Charge per km:</label>
                <input type="text" value={ischarge} onChange={(e) => { setcharge(e.target.value) }} required />
                <div className="error-message">{errors.charge}</div>
            </div>

            <div className="detail">
                <label >From:</label>
                <input type="text" value={isfrom} onChange={(e) => { setfrom(e.target.value) }} required />
                <div className="error-message">{errors.from}</div>
            </div>

            <div className="detail">
                <label >To:</label>
                <input type="text" value={isto} onChange={(e) => { setto(e.target.value) }} required />
                <div className="error-message">{errors.to}</div>
            </div>

            <div className="submit">
                <button onClick={handleride} >Submit</button>
            </div>

            
        </div>
    );
}

export default Provideride;
