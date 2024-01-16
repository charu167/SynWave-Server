const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
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

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// console.log(process.env.MONGO_URI);
mongoose
  .connect("mongodb://syncwavemongo:27017/")
  .then((e) => {
    console.log("Connected to mongoose");
  })
  .catch((error) => console.log(error));
