import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './userexpenses.css'

const GetUserExpenses = () => {
    const [expenses, setExpenses] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:5000/expense/get_expenses', { withCredentials: true })
            .then(response => { setExpenses(response.data); console.log(response.data) })
            .catch(error => { console.log("error:", error); alert(error.message) });
    };

    return (
        <div>
            <Nav loggedIn={true} />
            <center>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Get Expenses</button>
                </form>

                <h3>Expenses:</h3>
                <div className="expense-container">
                    {expenses.map((expense, index) => (
                        <div key={index} className="expense-card">
                            <h3>Payer: {expense.payer}</h3>
                            <p>Amount: <strong>{expense.amount}</strong></p>
                            <p>Method: <strong>{expense.split_method}</strong></p>
                            <div className="split-details">
                                <h4>Split Details:</h4>
                                <ul>
                                    {expense.split_data.map((split, valIndex) => (
                                        <li key={valIndex} className="split-item">
                                            <p>Email: {split.email}</p>
                                            <p>Amount: {split.amount}</p>
                                            <p>Percentage: {split.percentage}%</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </center>

        </div>
    );
};

export default GetUserExpenses;
