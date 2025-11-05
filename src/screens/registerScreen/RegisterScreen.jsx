import useForm from "../../hooks/useForm";
import { register } from "../../services/authService";
import useFetch from "../../hooks/useFetch";
import "./RegisterScreen.css";
import slackLogo from "../../assets/images/slack-logo.png";

const FORM_FIELDS = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
};
const initial_form_state = {
  [FORM_FIELDS.NAME]: "",
  [FORM_FIELDS.EMAIL]: "",
  [FORM_FIELDS.PASSWORD]: "",
};

const RegisterScreen = () => {
  const { sendRequest, loading, response, error } = useFetch();

  const onRegister = (form_state) => {
    sendRequest(() =>
      register(
        form_state[FORM_FIELDS.NAME],
        form_state[FORM_FIELDS.EMAIL],
        form_state[FORM_FIELDS.PASSWORD]
      )
    );
  };

  const {
    form_state: register_form_state,
    handleSubmit,
    handleInputChange,
  } = useForm({
    initial_form_state,
    onSubmit: onRegister,
  });

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo">
          <img src={slackLogo} alt="Slack logo" />
        </div>

        <h1 className="register-title">
          Primero, ingresa tu correo electrónico
        </h1>
        <p className="register-subtitle">
          Te sugerimos que uses la{" "}
          <strong>
            dirección de correo electrónico que usas en el trabajo.
          </strong>
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor={FORM_FIELDS.NAME} className="form-label">
              Nombre completo
            </label>
            <input
              name={FORM_FIELDS.NAME}
              id={FORM_FIELDS.NAME}
              type="text"
              onChange={handleInputChange}
              className="form-input"
              placeholder="Tu nombre completo"
            />
          </div>
          <div className="form-group">
            <label htmlFor={FORM_FIELDS.EMAIL} className="form-label">
              Correo electrónico
            </label>
            <input
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              type="email"
              onChange={handleInputChange}
              className="form-input"
              placeholder="nombre@empresa.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor={FORM_FIELDS.PASSWORD} className="form-label">
              Contraseña
            </label>
            <input
              name={FORM_FIELDS.PASSWORD}
              id={FORM_FIELDS.PASSWORD}
              type="password"
              onChange={handleInputChange}
              className="form-input"
              placeholder="Crea una contraseña"
            />
          </div>

          {!response ? (
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Registrando..." : "Continuar"}
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={true}
                className="submit-button success"
              >
                ¡Registro exitoso!
              </button>
              <div className="message success">
                <strong>¡Casi listo!</strong> Te enviamos un correo de
                verificación.
                <br />
                Por favor, revisá tu bandeja de entrada (y spam) para activar tu
                cuenta.
              </div>
            </>
          )}
          {error && <div className="message error">{error.message}</div>}
        </form>

        <div className="register-footer">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
