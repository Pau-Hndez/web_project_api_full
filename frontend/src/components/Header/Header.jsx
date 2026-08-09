import logo from "@images/header.png";
import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Header({ loggedIn, email, handleSignOut }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (loggedIn) {
    return (
      <header className="header">
        <div className="header__content">
          <img className="header__picture" src={logo} alt="Around the U.S." />
          <div className="header__user-loggedin">
            <span className="header__user-email">{email}</span>
            <button className="header__logout-button" onClick={handleSignOut}>
              Cerrar Sesión
            </button>
          </div>
        </div>
        <hr className="header__line" />
      </header>
    );
  }
  return (
    <header className="header">
      <div className="header__content">
        <img className="header__picture" src={logo} alt="Around the U.S." />
        <nav>
          {location.pathname === "/signin" && (
            <Link to="/signup" className="header__nav">
              Registrarse
            </Link>
          )}
          {location.pathname === "/signup" && (
            <Link to="/signin" className="header__nav">
              Iniciar Sesión
            </Link>
          )}

          {location.pathname !== "/signin" &&
            location.pathname !== "/signup" && (
              <div className="auth-buttons">
                <Link to="/signin">Iniciar Sesión</Link>
                <Link to="/signup">Registrarse</Link>
              </div>
            )}
        </nav>
      </div>
      <hr className="header__line" />
    </header>
  );
}
