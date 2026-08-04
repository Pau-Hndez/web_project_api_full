import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser, handleUpdateAvatar } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser(name, description);
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Name"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="About me"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <button className="popup__save" type="submit">
        Guardar
      </button>
    </form>
  );
}
