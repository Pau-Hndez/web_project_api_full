const jwt = require("jsonwebtoken");
const JWT_SECRET = "super-secret-key"; // clave temporal
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Autorización requerida",
    });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next("Token invalido");
  }

  req.user = payload;

  next();
};

module.exports = auth;
