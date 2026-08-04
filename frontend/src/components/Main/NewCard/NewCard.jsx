import { useContext, useRef } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function NewCard() {
  const nameRef = useRef();
  const linkRef = useRef();

  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  function handleSubmit(e) {
    e.preventDefault();

    handleAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="edit-card-popup"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        id="card-name"
        className="popup__input popup__input_type_name"
        name="title"
        placeholder="Título"
        type="text"
        required
        minLength="2"
        maxLength="30"
        ref={nameRef}
      />
      <span className="popup__input-error card-name-error"></span>
      <input
        id="card-description"
        className="popup__input popup__input_type_description"
        name="picture"
        placeholder="Enlace a la imagen."
        type="url"
        required
        ref={linkRef}
      />
      <span className="popup__input-error card-description-error"></span>
      <button className="popup__save" type="submit">
        Crear
      </button>
    </form>
  );
}
