import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import igniteLogo from "../../assets/ignite-logo.svg";
import styles from "./Register.module.css";
import { ArrowLeft } from "phosphor-react";
import { toast } from "react-toastify";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    const res = await register(name, email, password, role);

    toast.success("Usuário criado com sucesso!")

    if (res) navigate("/");
  }

  const isSubmitDisabled = !email || !password;

  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <h2>Informe seus dados</h2>
        <br />
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <br />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="role">Função/Cargo Atual</label>
          <input
            type="text"
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          />

          <footer>
            <button type="submit" disabled={isSubmitDisabled}>
              Prosseguir com cadastro
            </button>
          </footer>
        </form>
      </div>

      <div className={styles.titleContainer}>
        <img src={igniteLogo} alt="Ignite logo" />
        <h2>
          Para que você possa acessar nossa plataforma, realize seu cadastro ao
          lado informando dados pessoais.
        </h2>
        <br />
        <p>
          Após o cadastro, se estiver tudo ok, você receberá um e-mail de
          confirmação.
        </p>

        <br />
        <Link to="/" className={styles.backButton}>
          <ArrowLeft />
          Voltar para login
        </Link>
      </div>
    </div>
  );
}
