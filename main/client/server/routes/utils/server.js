const express = require("express"); const dotenv = require("dotenv"); const cors = require("cors"); const authRoutes = require("./routes/auth");

dotenv.config(); const app = express(); app.use(cors()); app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));

auth.js (routes):

const express = require("express"); const router = express.Router(); const { sendOTP, verifyOTP } = require("../utils/otp");

// Login route router.post("/login", async (req, res) => { const { email, password } = req.body;

// Validate email & password with DB const userExists = true;

if (userExists) { await sendOTP(email); res.status(200).json({ message: "OTP sent" }); } else { res.status(401).json({ message: "Invalid credentials" }); } });

// Verify OTP route router.post("/verify", async (req, res) => { const { email, otp } = req.body; const isValid = await verifyOTP(email, otp);

if (isValid) { res.status(200).json({ message: "2FA successful" }); } else { res.status(401).json({ message: "Invalid or expired OTP" }); } });

module.exports = router;

otp.js (OTP generator and mailer):

const crypto = require("crypto"); const nodemailer = require("nodemailer");

const otpStore = new Map(); // Replace with Redis or DB in prod

function generateOTP() { return crypto.randomInt(100000, 999999).toString(); }

async function sendOTP(email) { const otp = generateOTP(); const expiry = Date.now() + 5 * 60 * 1000;

otpStore.set(email, { otp, expiry });

const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS, }, });

await transporter.sendMail({ from: "Fitbit Security" <${process.env.EMAIL}>, to: email, subject: "Your OTP Code", text: Your Fitbit verification code is ${otp}. It will expire in 5 minutes., }); }

async function verifyOTP(email, inputOtp) { const record = otpStore.get(email); if (!record) return false;

const { otp, expiry } = record; if (Date.now() > expiry) { otpStore.delete(email); return false; }

const isValid = otp === inputOtp; if (isValid) otpStore.delete(email); return isValid; }

module.exports = { sendOTP, verifyOTP };