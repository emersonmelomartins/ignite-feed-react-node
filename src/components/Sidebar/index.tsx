import { PencilLine } from "phosphor-react";
import { FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "../Avatar";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  const { logout } = useAuth();

  function handleLogout(event: FormEvent) {
    event.preventDefault();

    logout();
  }

  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      />

      <div className={styles.profile}>
        <Avatar src="https://avatars.githubusercontent.com/u/42918667?v=4" />
        <strong>Emerson Melo</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <button type="button">
          <PencilLine size={20} />
          Editar seu perfil
        </button>
        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </footer>
    </aside>
  );
}