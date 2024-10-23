import React, { useState } from "react"
import './Nav.css'
import { useNavigate } from "react-router";
import axios from "axios";

export default function Nav({ loggedIn = false }) {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

    function letsFix() {
        let top = window.scrollY;

        let point = document.getElementById('header');
        let height = point.offsetHeight;

        if (height + top > 120) {
            point.classList.add('sticky')
        }
        else {
            if (point.classList.contains('sticky'))
                point.classList.remove('sticky')
        }

    }

    window.addEventListener('scroll', letsFix);

    const handleLogout = () => {
        axios.post('http://localhost:5000/user/logout', { withCredentials: true })
            .then(response => {
                console.log(response)
                setIsLoggedIn(false);
                navigate('/');
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <div className='header' id='header'>
                <div className="nav-bar" id='nav-bar'>
                    <div className='items-not-1'>
                        <div onClick={() => { navigate('/') }}>Home</div>
                        <div onClick={() => { navigate('/login') }}>Login</div>
                        {isLoggedIn ?
                            <>
                                <div onClick={() => { navigate('/addExpense') }}>AddExpense</div>
                                <div onClick={() => { navigate('/getExpense') }}>GetUserExpenses</div>
                                <div onClick={() => { navigate('/downloadSheet') }}>DownloadBalanceSheet</div>
                                <div onClick={handleLogout}>Logout</div>
                            </>

                            : <></>}
                    </div>
                </div>
            </div>
        </div>
    )

}
