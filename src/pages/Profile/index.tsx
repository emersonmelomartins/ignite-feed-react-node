import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/Avatar";
import defaultUserAvatarPng from "../../assets/default-avatar.png";
import styles from "./Profile.module.css";
import { api } from "../../services/api";

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    api.get("/users/profile").then((resp) => {
      const { data } = resp;
      setName(data.name);
      setRole(data.role);
      setAvatar(data.avatar);
      setEmail(data.email);
    });
  }, []);

  function handleUpdateProfile() {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.sideMenuContainer}>
        <Link to="/home" className={styles.backButton}>
          <ArrowLeft size={18} />
          Voltar
        </Link>
      </div>

      <div className={styles.profileContainer}>
        <img
          className={styles.cover}
          src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
        />

        <section className={styles.profile}>
          <div className="profileContainer">
            <div className={styles.avatarContainer}>
              <Avatar src={null ?? defaultUserAvatarPng} />

              <button type="button">Alterar foto de perfil</button>
            </div>

            <div className={styles.personalDataContainer}>
              <h2>Dados pessoais</h2>
              <br />

              <form onSubmit={handleUpdateProfile}>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />

                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <label htmlFor="role">Função/Cargo Atual</label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                />

                <footer>
                  <button type="submit">Alterar seus dados</button>
                </footer>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
