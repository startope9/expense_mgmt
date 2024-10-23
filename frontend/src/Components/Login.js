
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/user/login', { 'email': email, 'passwd': password }, { withCredentials: true })
            .then(response => {
                if (response.status === 200) { alert('logged-in'); navigate('/addExpense'); }
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <Nav />
            <center style={{ marginTop: '10%' }}>
                <div className="field" tabIndex="1">
                    <label htmlFor="email">
                        <i className="far fa-envelope"></i>Your Email
                    </label>
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. John Doe" required />
                </div>
                <div className="field" tabIndex="2">
                    <label htmlFor="password">
                        <i className="fas fa-lock"></i>Password
                    </label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <br />
                <button onClick={handleSubmit}>Submit</button>
            </center>
        </div>
    );
}
