const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
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
        const error = new Error();
        error.statusCode = 404;
        throw error;
      }

      if (!card.owner.equals(req.user._id)) {
        const error = new Error();
        error.statusCode = 403;
        throw error;
      }

      return card.deleteOne();
    })
    .then(() => res.send({ message: "Tarjeta eliminada correctamente" }))
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
