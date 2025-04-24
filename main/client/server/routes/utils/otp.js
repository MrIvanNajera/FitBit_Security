const crypto = require("crypto");
const nodemailer = require("nodemailer");

const otpStore = new Map(); // Replace with Redis or DB in production

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

async function sendOTP(email) {
  const otp = generateOTP();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now

  otpStore.set(email, { otp, expiry });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Fitbit Security" <${process.env.EMAIL}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your Fitbit verification code is ${otp}. It will expire in 5 minutes.`,
  });
}

async function verifyOTP(email, inputOtp) {
  const record = otpStore.get(email);
  if (!record) return false;

  const { otp, expiry } = record;
  if (Date.now() > expiry) {
    otpStore.delete(email);
    return false;
  }

  const isValid = otp === inputOtp;
  if (isValid) otpStore.delete(email);
  return isValid;
}

module.exports = { sendOTP, verifyOTP };
