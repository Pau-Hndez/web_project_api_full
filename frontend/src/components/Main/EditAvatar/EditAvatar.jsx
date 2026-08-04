import { useContext, useRef } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();

  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <form
      className="popup__form"
      id="edit-profile-picture"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        id="card-description"
        className="popup__input popup__input_type_description"
        name="avatar"
        placeholder="Enlace a la imagen."
        type="url"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error card-description-error"></span>
      <button className="popup__save" type="submit">
        Guardar
      </button>
    </form>
  );
}
