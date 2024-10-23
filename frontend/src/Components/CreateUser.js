
import React, { useState } from 'react';
import axios from 'axios';
import './create.css';
import Nav from '../Nav/Nav';

const CreateUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userData.mobile.length !== 10) {
            alert("Mobile number must be 10 digits.");
            return;
        }

        if (!validateEmail(userData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        axios.post('http://localhost:5000/user/create_user', userData)
            .then(response => alert(response.data.message))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <Nav />
            <center style={{ marginTop: '10%' }}>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="field" tabIndex="1">
                            <label htmlFor="name">
                                <i className="far fa-user"></i>Your Name
                            </label>
                            <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="e.g. John Doe" required />
                        </div>
                        <div className="field" tabIndex="2">
                            <label htmlFor="email">
                                <i className="far fa-envelope"></i>Your Email
                            </label>
                            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="email@domain.com" required />
                        </div>
                        <div className="field" tabIndex="3">
                            <label htmlFor="mobile">
                                <i className="fas fa-phone"></i>Your Mobile
                            </label>
                            <input type="text" name="mobile" value={userData.mobile} onChange={handleChange} placeholder="1234567890" required />
                        </div>
                        <div className="field" tabIndex="4">
                            <label htmlFor="password">
                                <i className="fas fa-lock"></i>Password
                            </label>
                            <input type="password" name="password" value={userData.password} onChange={handleChange} required />
                        </div>
                        <div className="field" tabIndex="5">
                            <label htmlFor="confirmPassword">
                                <i className="fas fa-lock"></i>Confirm Password
                            </label>
                            <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required />
                        </div>
                        <button type="submit">Create User</button>
                    </form>
                </div>
            </center>
        </div>
    );
};

export default CreateUser;
