export default function ImagePopup({ card, onClose }) {
  return (
    <div className="popup">
      <div className="popup__image-content">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />

        <img className="popup__image-big" src={card.link} alt={card.name} />

        <p className="popup__image-name">{card.name}</p>
      </div>
    </div>
  );
}
