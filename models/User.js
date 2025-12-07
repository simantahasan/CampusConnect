const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  studentId: { type: String, unique: true },
  gsuiteEmail: { type: String, unique: true },
  isVerified: { type: Boolean, default: false } // no password needed
});

module.exports = mongoose.model("User", UserSchema);


