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
  if (statusCode === 404) {
    message = "Recurso no encontrado";
  }

  if (statusCode === 403) {
    message = "No tienes permiso para eliminar este recurso";
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? err.message : message,
  });
};

module.exports = errorHandler;
