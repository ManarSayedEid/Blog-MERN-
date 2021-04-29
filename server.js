const express = require("express");
const connectDB = require("./config/connection");

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("yes");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
});
