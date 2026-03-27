const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  favourites: [String] // store recipe IDs like "butter-chicken"
});

module.exports = mongoose.model("User", userSchema);
