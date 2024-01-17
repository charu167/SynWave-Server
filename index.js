const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//node middleware
app.use(express.json());
app.use(cors());

//Importing routes
const authRouter = require("./routes/auth.routes");
const playlistRouter = require("./routes/playlist.routes");
const userRouter = require("./routes/user.routes");

//Routing
app.use("/auth", authRouter);
app.use("/playlists", playlistRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>HIIIIIIII</h1>");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then((e) => {
    console.log("Connected to mongoose");
  })
  .catch((error) => console.log(error));

  module.exports = app
