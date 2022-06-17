import { Avatar } from "../Avatar";
import { Comment } from "../Comment";
import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src="https://avatars.githubusercontent.com/u/42918667?v=4" />

          <div className={styles.authorInfo}>
            <strong>Emerson Melo</strong>
            <span>Web Developer</span>
          </div>
        </div>

        <time title="11 de maio as 08:13" dateTime="2022-05-11 08:13:27">
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, aliquam
          fugit consequuntur, eligendi hic enim, harum obcaecati omnis vitae
          illum nihil officiis autem doloribus consectetur quos ex! Quisquam,
          voluptates iusto!
        </p>

        <p>
          👉 <a href="#">https://google.com.br</a>
        </p>

        <p>
          <a href="#">#novoprojeto</a> <a href="#">#nlw</a>{" "}
          <a href="#">#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentário" />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
