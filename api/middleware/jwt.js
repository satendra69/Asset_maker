const jwt = require("jsonwebtoken");
const createError = require("./createError");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.error("Authorization header is missing!");
    return next(createError(401, "Authorization header is missing!"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) return next(createError(401, "Token is missing!"));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return next(createError(403, "Token is not valid!"));
    }

    req.userId = payload.id;
    req.isAdmin = payload.isAdmin;
    next();
  });
};

module.exports = verifyToken;
