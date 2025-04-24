const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("../utils/otp");

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // TODO: Validate email & password with DB
  const userExists = true; // Replace with real DB check

  if (userExists) {
    await sendOTP(email);
    res.status(200).json({ message: "OTP sent" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Verify OTP route
router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;
  const isValid = await verifyOTP(email, otp);

  if (isValid) {
    res.status(200).json({ message: "2FA successful" });
  } else {
    res.status(401).json({ message: "Invalid or expired OTP" });
  }
});

module.exports = router;
