const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: (url) => validator.isURL(url),
      message: "URL inválida",
    },
  },
  email: {
    required: true,
    type: String,
    validate: {
      // esto reemplaza el unique:true, junto con el index que se encuentra al final del archivo, para evitar errores de validación de email duplicado
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Correo electrónico no válido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } },
  },
);
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Correo o contraseña incorrectos");
        error.statusCode = 401;
        return Promise.reject(error);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Correo o contraseña incorrectos");
          error.statusCode = 401;
          return Promise.reject(error);
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
