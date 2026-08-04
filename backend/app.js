const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/errorHandler");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");
const auth = require("./middlewares/auth");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
app.use(requestLogger);
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);
app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({
    message: "Página no encontrada",
  });
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`servidor corriendo http://localhost:${PORT}`);
});
