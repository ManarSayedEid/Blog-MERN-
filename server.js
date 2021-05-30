const express = require("express");
const connectDB = require("./config/connection");
const path = require("path");

const app = express();

connectDB();

app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/post"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
