const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail()
    .then((cards) => res.send({ data: cards }))
    .catch(next);
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

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .then((card) => {
      if (!card) {
        const error = new Error("No existe la tarjeta");
        error.statusCode = 404;
        throw error;
      }

      return res.send({ data: card });
    })
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .then((card) => {
      if (!card) {
        const error = new Error("No existe la tarjeta");
        error.statusCode = 404;
        throw error;
      }

      return res.send({ data: card });
    })
    .catch(next);
};
