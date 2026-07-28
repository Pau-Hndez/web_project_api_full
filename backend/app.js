const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: "6a3dd9df82172af36c4a1db8",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use((req, res) => {
  res.status(404).send({
    message: "Página no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo http://localhost:${PORT}`);
});
