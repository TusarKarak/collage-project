const express = require('express');
const router = express.Router();
const User = require('../models/registeruser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
//const { JWT_SECRET } = require('../config');

// Sign Up
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "karaktusar@gmail.com",
    pass:"tamtutldrphfkiuc",
  },
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, "tusarkarak");
  res.json(token);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, "tusarkarak");
  res.json({ message: 'Login successful', token });
});

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  const user = await User.findOneAndUpdate(
    { email },
    { otp, otpExpires: Date.now() + 5 * 60 * 1000 }, // 5 mins
    { upsert: true, new: true }
  );
  
  const mailOptions = {
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is ${otp}</p>`,
  };
  
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err){
      //console.log("abc")
      //console.log(err);
      return res.status(500).send("Error sending email");
    } 
    res.send("OTP sent");
  });
})

router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).send("Invalid or expired OTP");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.send("Password reset successful");
});

module.exports = router;
