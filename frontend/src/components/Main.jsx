import { useContext, useEffect, useState } from "react";
import profilePicture from "@images/profile_picture.jpg";
import addButton from "@images/add-button.png";
import Popup from "./Main/Popup/Popup";
import NewCard from "./Main/NewCard/NewCard";
import EditProfile from "./Main/EditProfile/EditProfile";
import EditAvatar from "./Main/EditAvatar/EditAvatar";
import Card from "./Main/Card/Card";
import ImagePopup from "./Main/ImagePopup/ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main() {
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const userContext = useContext(CurrentUserContext);
  const {
    currentUser,
    popup,
    setPopup,
    handleOpenPopup,
    handleClosePopup,
    cards,
    handleCardDelete,
    handleCardLike,
    handleAddPlaceSubmit,
  } = userContext;

  const newEditProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const newEditAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  function handleClickCard(card) {
    handleOpenPopup({
      children: <ImagePopup card={card} onClose={handleClosePopup} />,
    });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__picture">
            <img
              className="profile__img-picture"
              src={currentUser.avatar}
              alt="Foto de perfil"
            />
            <button
              className="profile__edit-picture"
              onClick={() => handleOpenPopup(newEditAvatarPopup)}
            ></button>
          </div>
          <div className="profile__description">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={() => handleOpenPopup(newEditProfilePopup)}
            ></button>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img src={addButton} alt="Agregar" />
        </button>
      </section>
      <section className="cards content__places">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleClickCard={handleClickCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
      <template id="card__template">
        <li className="card">
          <img className="card__picture" alt="" src="#" />
          <button
            aria-label="Delete card"
            className="card__delete-button"
            type="button"
          ></button>
          <div className="card__name">
            <h2 className="card__title"></h2>
            <button
              aria-label="like card"
              className="card__like-button"
              type="button"
            ></button>
          </div>
        </li>
      </template>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
