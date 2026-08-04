import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data);
  };
  return (
    <>
      <section className="login">
        <h1 className="login__title">Inicia sesión</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">
            <input
              className="login__input login__input_type_email"
              id="login-email"
              name="email"
              placeholder="Correo electrónico"
              type="email"
              required
              value={data.email}
              onChange={handleChange}
            />
            <span className="login__error" id="email-error"></span>
          </label>

          <label className="login__label">
            <input
              className="login__input login__input_type_password"
              id="login-password"
              name="password"
              placeholder="Contraseña"
              type="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <span className="login__error" id="password-error"></span>
          </label>
          <button type="submit" className="login__submit-button">
            Inicia sesión
          </button>
        </form>
        <div className="login__signup">
          <p>¿Aún no eres miembro?</p>
          <Link to="/signup" className="login__signup-link">
            Regístrate aquí
          </Link>
        </div>
      </section>
    </>
  );
}
