import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Nav from '../Nav/Nav';

const DownloadBalanceSheet = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('')

    const handleDownload = () => {
        axios.get('http://localhost:5000/expense/download_balance_sheet', {
            withCredentials: true,
            responseType: 'blob'
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'balance_sheet.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        setMessage('Warning: ' + error.response.data.message);
                    } else if (error.response.status === 401) {
                        // Redirect to login page on 401 status
                        navigate('/login'); // Change this to your login route
                    }
                } else {
                    setMessage('An unexpected error occurred.');
                }
            });
    };



    return (
        <div>
            <Nav loggedIn={true} />
            <button onClick={handleDownload}>Download Balance Sheet</button>
            {message}
        </div>
    );
};

export default DownloadBalanceSheet;
