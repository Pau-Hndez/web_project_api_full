const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() =>
      res.status(500).send({ message: "Ha ocurrido un error en el servidor" }),
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res
        .status(404)
        .send({ message: "No existe un usuario con el id solicitado" }),
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: "Datos inválidos" }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      returnDocument: "after", //new:true is now depricated according to the newest Mongoose documentation
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      }),
    );
};

module.exports.updateAvatar = (req, res) => {
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
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      }),
    );
};
