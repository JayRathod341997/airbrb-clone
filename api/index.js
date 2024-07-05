const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
const bcryptSalt = bcrypt.genSaltSync(10);
mongoose.connect(process.env.MONGOOSE_URL);

app.get("/test", (req, res) => {
  res.send("Testing.....");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

//

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
