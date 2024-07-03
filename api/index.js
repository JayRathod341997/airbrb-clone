const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.send("Testing.....");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
