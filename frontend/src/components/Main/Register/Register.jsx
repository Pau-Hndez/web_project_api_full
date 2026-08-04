import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({ onRegister }) => {
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
    onRegister(data);
  };

  return (
    <>
      <section className="register">
        <h1 className="register__title">Regístrate</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__label">
            <input
              className="register__input register__input_type_email"
              id="register-email"
              name="email"
              placeholder="Correo electrónico"
              type="email"
              required
              value={data.email}
              onChange={handleChange}
            />
            <span className="register__error" id="email-error"></span>
          </label>

          <label className="register__label">
            <input
              className="register__input register__input_type_password"
              id="register-password"
              name="password"
              placeholder="Contraseña"
              type="password"
              required
              value={data.password}
              onChange={handleChange}
            />
            <span className="register__error" id="password-error"></span>
          </label>

          <button type="submit" className="register__submit-button">
            Regístrate
          </button>
        </form>
        <div className="register__signin">
          <p>¿Ya eres miembro?</p>
          <Link to="/signin" className="register__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </section>
    </>
  );
};

export default Register;
