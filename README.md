# FitBit Security

A 2FA (Two-Factor Authentication) implementation for Fitbit security using OTP (One-Time Password).

## Table of Contents
- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [License](#license)
- [Contributors](#contributors)

## Overview
This project demonstrates a secure 2FA system for Fitbit accounts. It uses OTPs sent via email to verify user identity during login.

## Directory Structure
```
FitBit_Security/
├── main/
│   ├── client/
│   │   ├── index.html       # Frontend HTML file
│   │   ├── otp.js           # Frontend JavaScript for OTP handling
│   │   └── server/
│   │       ├── routes/
│   │       │   └── auth.js  # Backend routes for login and OTP verification
│   │       ├── utils/
│   │       │   └── otp.js   # Utility functions for OTP generation and verification
│   │       ├── .env         # Environment variables (not committed to version control)
│   │       └── server.js    # Main server file
├── README.md                # Project documentation
└── package.json             # Node.js dependencies and scripts
```

## Features
- User login with email and password.
- OTP generation and email delivery.
- OTP verification for enhanced security.
- Environment variable support for sensitive configurations.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, JavaScript
- **Email Service**: Nodemailer
- **Environment Management**: dotenv

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/MrIvanNajera/FitBit_Security.git
   cd FitBit_Security
   ```

2. Navigate to the server directory:
   ```bash
   cd main/client/server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the `server` directory and configure it:
   ```properties
   PORT=3000
   EMAIL_SERVICE=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   OTP_EXPIRATION_MINUTES=5
   ```

5. Start the server:
   - For production:
     ```bash
     npm start
     ```
   - For development (with auto-restart):
     ```bash
     npm run dev
     ```

6. Open the frontend in your browser:
   - Navigate to `http://localhost:3000` (or the port specified in your `.env` file).

## License
This project is licensed under the **FIU CIS5370 RVC 1251** license.

---

### Contributors
- Marco Pena
- Jorge Salas
- Ivan Najera