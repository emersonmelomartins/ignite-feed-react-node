import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import igniteLogo from "../../assets/ignite-logo.svg";
import styles from "./Login.module.css";

export function Login() {
  const navigate = useNavigate();
  const { signed, login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    signed && navigate("/home");
  }, [signed]);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    login(email, password);
  }

  const isSubmitDisabled = !email || !password;

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <img src={igniteLogo} alt="Ignite logo" />
        <h1>Faça seu login na plataforma</h1>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <footer>
            <div className={styles.signup}>
              <span>
                Novo por aqui? <Link to="/register">Registre-se</Link>
              </span>

              <a href="">Esqueceu a senha?</a>
            </div>
            <button type="submit" disabled={isSubmitDisabled}>
              Entrar
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
