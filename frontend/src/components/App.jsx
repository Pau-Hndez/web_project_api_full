import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { setToken, getToken } from "../utils/token";

import Login from "./Main/Login/Login";
import Register from "./Main/Register/Register";
import InfoTooltip from "./Main/InfoTooltip/InfoTooltip";
import ProtectedRoute from "./Main/ProtectedRoute/ProtectedRoute";
import * as auth from "../utils/auth";
import Header from "./Header/Header";
import Main from "./Main";
import Footer from "./Footer/Footer";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        handleOpenInfoTooltip(true);
      })
      .catch(() => {
        handleOpenInfoTooltip(false);
      });
  }
  function handleLogin(data) {
    auth
      .authorize(data)
      .then((res) => {
        setToken(res.token);

        return auth.checkToken(res.token);
      })
      .then((data) => {
        setEmail(data.data.email);
        setLoggedIn(true);
        navigate("/");
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    navigate("/signin");
    localStorage.removeItem("jwt");
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    auth
      .checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.data.email);
      })
      .catch(console.error);
  }, []);

  function handleOpenInfoTooltip(success) {
    setIsSuccess(success);

    if (success) {
      setMessage("¡Correcto! Ya estás registrado.");
    } else {
      setMessage("Uy, algo salió mal. Por favor, inténtalo de nuevo.");
    }
    setIsInfoTooltipOpen(true);
  }

  function handleCloseInfoTooltip() {
    if (isSuccess) {
      navigate("/signin");
    } else {
      navigate("/signup");
    }

    setIsInfoTooltipOpen(false);
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  const handleUpdateUser = (name, about) => {
    (async () => {
      await api.editProfile(name, about).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };
  const handleUpdateAvatar = (avatar) => {
    (async () => {
      await api.editProfilePicture(avatar).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  //card
  useEffect(() => {
    if (!loggedIn) return;

    api.getInitialCards().then(setCards).catch(console.error);
    api.getUserInfo().then(setCurrentUser).catch(console.error);
  }, [loggedIn]);

  async function handleCardLike(card) {
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !card.isLiked);

      setCards((cards) =>
        cards.map((item) => (item._id === card._id ? newCard : item)),
      );
    } catch (error) {
      console.error(error);
    }
  }
  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }
  const handleAddPlaceSubmit = ({ name, link }) => {
    (async () => {
      await api.addCard(name, link).then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      });
    })();
  };
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        popup,
        setPopup,
        handleOpenPopup,
        handleClosePopup,
        handleUpdateUser,
        handleUpdateAvatar,
        cards,
        handleCardDelete,
        handleCardLike,
        handleAddPlaceSubmit,
        email,
        loggedIn,
        handleLogin,
        handleRegister,
        handleSignOut,
        handleOpenInfoTooltip,
      }}
    >
      <Header email={email} loggedIn={loggedIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleCloseInfoTooltip}
        isSuccess={isSuccess}
        message={message}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
