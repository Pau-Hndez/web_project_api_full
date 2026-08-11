const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Datos inválidos";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "ID inválido";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "El correo electrónico ya está registrado";
  }

  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Ha ocurrido un error en el servidor" : message,
  });
};

module.exports = errorHandler;
