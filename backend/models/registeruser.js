const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('UserRegister', userSchema);
