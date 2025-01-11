const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res
      .status(401)
      .json({ message: "Authentication Token is required" });
  }

  jwt.verify(token, "OnlineBookStore", (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token expired! Please sign_in again" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
