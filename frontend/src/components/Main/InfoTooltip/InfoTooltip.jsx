import successIcon from "../../../assets/images/successIcon.png";
import errorIcon from "../../../assets/images/errorIcon.png";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`infoTooltip ${isOpen ? "infoTooltip_opened" : ""}`}>
      <div className="infoTooltip__container infoTooltip__container_type_info">
        <button
          className="infoTooltip__close"
          type="button"
          onClick={onClose}
        ></button>

        <img
          className="infoTooltip__icon"
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
        />

        <p className="infoTooltip__title infoTooltip__title_type_info">
          {message}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
