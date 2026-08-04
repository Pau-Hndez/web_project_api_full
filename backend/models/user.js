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
    validate: {
      validator: (url) =>
        /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)?$/.test(
          url,
        ),
      message: "URL inválida",
      default:
        "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
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
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Correo incorrectos"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Contraseña incorrectos"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
