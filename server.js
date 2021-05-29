const express = require("express");
const connectDB = require("./config/connection");
const socket = require("socket.io");

const app = express();

connectDB();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("yes");
});

require("./models/User");

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/post"));

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("socket connected");
});
