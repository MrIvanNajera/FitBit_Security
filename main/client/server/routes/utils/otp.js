const crypto = require("crypto");

const otpStore = new Map(); // Temporary in-memory store for OTPs

// Helper function to generate a 6-digit OTP
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

// Function to generate and send OTP
async function sendOTP(email) {
  const otp = generateOTP();
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // OTP expires in 5 minutes

  // Simulate sending OTP via email (replace with real email service)
  console.log(`OTP for ${email}: ${otp}`);
}

// Function to verify OTP
async function verifyOTP(email, otp) {
  const record = otpStore.get(email);

  if (!record) return false; // No OTP found for the email

  const { otp: storedOtp, expiresAt } = record;

  if (Date.now() > expiresAt) {
    otpStore.delete(email); // Remove expired OTP
    return false;
  }

  if (storedOtp === otp) {
    otpStore.delete(email); // OTP is valid, remove it
    return true;
  }

  return false;
}

// Function to handle login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Simulate sending login request to the server
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Login successful. Please enter the OTP sent to your email.");
      } else {
        alert("Login failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    });
}

// Function to handle OTP verification
function verify() {
  const otp = document.getElementById("otp").value;

  if (!otp) {
    alert("Please enter the OTP.");
    return;
  }

  // Simulate sending OTP verification request to the server
  fetch("/api/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("OTP verified successfully. You are now logged in.");
      } else {
        alert("OTP verification failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification.");
    });
}

module.exports = { sendOTP, verifyOTP };
