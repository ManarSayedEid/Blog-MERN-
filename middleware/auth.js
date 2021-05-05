const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decodedData = jwt.verify(token, config.get("jwtSecret"));
    console.log({ decodedData });
    req.userId = decodedData.id;
    console.log(req.userId);
    next();
  } catch (error) {
    res.status(401).json({ msg: "invalid token" });
  }
};
