const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    googleID: String,
    spotifyID: String,
    auth: {
      googleRefreshToken: String,
      spotifyRefreshToken: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
