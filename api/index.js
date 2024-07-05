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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
