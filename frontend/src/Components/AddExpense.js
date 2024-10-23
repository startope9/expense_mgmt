import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';

const AddExpense = () => {
    const [expenseData, setExpenseData] = useState({
        payer_email: '',
        amount: 0,
        split_method: 'equal',
        split_data: []
    });

    const handleChange = (e) => {
        setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
    };

    const handleSplitChange = (index, e) => {
        const updatedSplitData = [...expenseData.split_data];
        updatedSplitData[index][e.target.name] = e.target.value;
        setExpenseData({ ...expenseData, split_data: updatedSplitData });
    };

    const handleAddSplitParticipant = () => {
        setExpenseData({
            ...expenseData,
            split_data: [...expenseData.split_data, { email: '', amount: 0, percentage: 0 }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(expenseData);
        axios.post('http://localhost:5000/expense/add_expense', expenseData)
            .then(response => alert(response.data.message))
            .catch(error => alert(error.message));
    };

    return (
        <div>
            <Nav loggedIn={true} />
            <center style={{ 'marginTop': '10%' }}>
                <form onSubmit={handleSubmit}>
                    <label>Payer Email: </label>
                    <input type="email" name="payer_email" value={expenseData.payer_email} onChange={handleChange} required /><br />

                    <label>Amount: </label>
                    <input type="number" name="amount" value={expenseData.amount} onChange={handleChange} required /><br />

                    <label>Split Method: </label>
                    <select name="split_method" value={expenseData.split_method} onChange={handleChange}>
                        <option value="equal">Equal</option>
                        <option value="exact">Exact</option>
                        <option value="percentage">Percentage</option>
                    </select><br />

                    <h3>Participants</h3>
                    {expenseData.split_data.map((participant, index) => (
                        <div key={index}>
                            <label>Participant Email: </label>
                            <input
                                type="email"
                                name="email"
                                value={participant.email}
                                onChange={(e) => handleSplitChange(index, e)}
                                required
                            /><br />

                            {expenseData.split_method === 'exact' && (
                                <>
                                    <label>Amount: </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={participant.amount}
                                        onChange={(e) => handleSplitChange(index, e)}
                                        required
                                    /><br />
                                </>
                            )}

                            {expenseData.split_method === 'percentage' && (
                                <>
                                    <label>Percentage: </label>
                                    <input
                                        type="number"
                                        name="percentage"
                                        value={participant.percentage}
                                        onChange={(e) => handleSplitChange(index, e)}
                                        required
                                    /><br />
                                </>
                            )}
                        </div>
                    ))}

                    <button type="button" onClick={handleAddSplitParticipant}>
                        Add Participant
                    </button>
                    <button type="submit">Add Expense</button>
                </form>
            </center>
        </div>
    );
};

export default AddExpense;
