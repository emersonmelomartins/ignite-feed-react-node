import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { Avatar } from "../../components/Avatar";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import {
  GetCurrentUserProfile,
  UpdateCurrentUserAvatar,
  UpdateCurrentUserData,
} from "../../services/userService";
import defaultUserAvatarPng from "../../assets/default-avatar.png";
import styles from "./Profile.module.css";
import { toast } from "react-toastify";

export function Profile() {
  const { refreshUserInfo } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState<string | null>("");

  useEffect(() => {
    GetCurrentUserProfile().then((resp) => {
      const { name, role, avatar, avatar_url, email } = resp.data;
      setName(name);
      setRole(role);
      setAvatar(avatar);
      setEmail(email);

      if (avatar) {
        setAvatar(avatar_url);
      }
    });
  }, []);

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();
    await UpdateCurrentUserData({ role });

    toast.success("Dados alterados com sucesso!");
  }

  async function handleUpdateAvatar(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    await UpdateCurrentUserAvatar(formData);

    refreshUserInfo();
  }

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
              <Avatar src={avatar ?? defaultUserAvatarPng} />

              <label htmlFor="avatar">
                Alterar foto de perfil
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif, .svg"
                  multiple={false}
                  id="avatar"
                  name="avatar"
                  onChange={handleUpdateAvatar}
                />
              </label>
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
                  disabled
                />

                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled
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
