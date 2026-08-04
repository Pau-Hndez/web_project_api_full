export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { card, handleClickCard, onCardLike, onCardDelete } = props;
  const imageComponent = { name, link, isLiked };
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="card">
      <img
        className="card__picture"
        alt={name}
        src={link}
        onClick={() => handleClickCard(imageComponent)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__name">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="like card"
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
