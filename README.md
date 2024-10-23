# Expense Sharing System

An expense-sharing web application built using Python Flask (backend) and React (frontend). This application allows users to share expenses among a group and track each member’s contribution.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation and Setup](#installation-and-setup)
4. [Backend API Routes](#backend-api-routes)
5. [Frontend Usage](#frontend-usage)
6. [Generating Balance Sheet PDF](#generating-balance-sheet-pdf)
7. [Contributing](#contributing)
8. [License](#license)

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
   cd expense-sharing-system/backend
