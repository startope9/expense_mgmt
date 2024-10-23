# Expense Sharing System

An expense-sharing web application built using Python Flask (backend) and React (frontend). This application allows users to share expenses among a group and track each member’s contribution.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation and Setup](#installation-and-setup)
4. [Backend API Routes](#backend-api-routes)
5. [Frontend Usage](#frontend-usage)
5. [Note](#Note)

---

## Features

- **User Authentication**: Secure login and registration with encrypted passwords.
- **Session Management**: Sessions are managed using Redis for secure session storage.
- **Expense Management**: Add, view, and share expenses among users.
- **Expense Splitting**: Split expenses equally or by percentage.
- **Balance Sheet PDF Export**: Users can download a balance sheet of their expenses in PDF format.
- **Responsive Design**: User-friendly interface for both desktop and mobile.

---

## Technologies Used

- **Backend**: Python, Flask, MongoDB, Redis for session management, Flask-CORS
- **Frontend**: React, Axios, CSS
- **Database**: MongoDB for data storage
- **PDF Generation**: FPDF library for exporting balance sheets

---

## Installation and Setup

### Prerequisites

- Python 3.x
- Node.js & npm
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- Redis (local or cloud-based)

### 1. Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/startope9/expense_mgmt.git

2. **move to backend directory**:

   ```bash
   cd backend

3. **Install the required packages**:

   ```bash
   pip install -r requirements.txt

4. **Run backend server**:

   ```bash
    python app.py

### 1. Frontend Setup

2. **move to frontend directory**:

   ```bash
   cd frontend

3. **Install the frontend dependencies**:

   ```bash
   npm install

4. **Run frontend server**:

   ```bash
    npm start


## Backend API Routes

* **POST `/user/create_user`**: Register a new user with email and password.
* **POST `/user/login`**: Log in with email and password. Sessions are managed with Redis.
* **POST `/user/login`**: User can logout after login.
* **POST `/expense/add_expenses`**: Add a new expense (amount, payer, split data).
* **GET `/expense/get_expenses`**: Fetch all expenses for the logged in user.
* **GET `/expense/download_balance_sheet`**: Download the expenses of the logged in user in pdf format.

---

## Frontend Usage

The application’s frontend is built with React and includes the following features:

* **/**: Home page to containing form to create user.
* **/login**: Form for user authentication.
* **/addExpense**: Add expenses with options to split equally or by percentage or by exact.
* **/getExpense**: Display the users expenses with details of splits and participants.
* **/downloadSheet**: Download the users expenses with details of splits and participants in pdf format.

## Note
Frontend runs on http://localhost:3000/ while backend runs on http://localhost:5000/ 