const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.send({ data: cards }))
    .catch(() =>
      res.status(500).send({ message: "Ha ocurrido un error en el servidor" }),
    );
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: "Tarjeta no encontrada",
        });
      }

      if (!card.owner.equals(req.user._id)) {
        return res.status(403).send({
          message: "No tienes permiso para eliminar esta tarjeta",
        });
      }

      return card.deleteOne().then(() => res.send(card));
    })
    .catch(next);
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: "No existe la tarjeta",
        });
      }

      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "ID de tarjeta inválido",
        });
      }

      return res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: "No existe la tarjeta",
        });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "ID de tarjeta inválido",
        });
      }

      return res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};
