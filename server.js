const express = require("express");
const connectDB = require("./config/connection");

const app = express();

connectDB();

app.use(express.json());

app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("yes");
});

require("./models/User");

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/post"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
