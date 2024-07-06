const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // for encrypting the password while storing on the DB
const jwt = require("jsonwebtoken"); // for setting jwt token as cookies
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Access variable through .env file
require("dotenv").config();

const jwtSecret = "secreteToken";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"], // for resolving the CORS error
    credentials: true,
  })
);
const bcryptSalt = bcrypt.genSaltSync(10); // define the complexity
mongoose.connect(process.env.MONGOOSE_URL); // connect with remote MongoDB

app.get("/test", (req, res) => {
  res.send("Testing.....");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body; // handled by express.json()
  try {
    // Create new user in the DB
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt), // hashSync so that await is not required
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //fetch user based on the email from the DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password with encrypted stored one
    const isMatch = bcrypt.compareSync(password, user.password); //sync for synchronous operation else use await
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // set jwt token in header
    jwt.sign(
      { email: user.email, id: user._id }, // user.email and  user._id fetch from MongoDb
      jwtSecret,
      {}, // option
      (err, token) => {
        //callback for getting token and send as a response
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies; // handled by external package require(cookie-parser)
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { email, name, _id } = await User.findById(userData.id); // defined by jwt.sign
      res.send({ email, name, _id });
    });
  } else {
    res.json(null);
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
