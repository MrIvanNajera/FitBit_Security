# FitBit Security

A 2FA (Two-Factor Authentication) implementation for Fitbit security using OTP (One-Time Password).

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [License](#license)

## Overview
This project demonstrates a secure 2FA system for Fitbit accounts. It uses OTPs sent via email to verify user identity during login.

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
   git clone https://github.com/your-username/FitBit_Security.git
   cd FitBit_Security