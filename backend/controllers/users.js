const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.send({ token });
    })
    .catch((err) => {
      if (
        err.message === "Correo incorrectos" ||
        err.message === "Contraseña incorrectos"
      ) {
        return res.status(401).send({
          message: "Correo o contraseña incorrectos",
        });
      }

      next(err);
    });
};
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
      }

      res.send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
      }

      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("El email ya está en uso");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).send(userWithoutPassword);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.statusCode = 400;
    } else if (err.code === 11000) {
      err.statusCode = 409;
      err.message = "El email ya está en uso";
    }
    next(err);
  }
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch(next);
};
