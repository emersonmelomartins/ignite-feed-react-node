import { Post } from "./components/Post";
import { Header } from "./components/Header";

import styles from "./App.module.css";
import "./global.css";
import { Sidebar } from "./components/Sidebar";

const posts = [
  {
    id: 1,
    author: {
      avatar_url: "https://github.com/emersonmelomartins.png",
      name: "Emerson Melo",
      role: "Web Developer",
    },
    content: [
      {
        type: "paragraph",
        value: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      },
      {
        type: "paragraph",
        value:
          "Earum libero ad dolore natus voluptas, nobis deleniti exercitationem at animi ab harum dolores sint repellendus accusantium voluptatibus possimus eveniet sed expedita!",
      },
      { type: "link", value: "https://google.com.br" },
    ],
    published_at: new Date("2022-06-15 13:07:00"),
  },
  {
    id: 2,
    author: {
      avatar_url: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO | Rocketseat",
    },
    content: [
      {
        type: "paragraph",
        value: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      },
      {
        type: "paragraph",
        value:
          "Earum libero ad dolore natus voluptas, nobis deleniti exercitationem at animi ab harum dolores sint repellendus accusantium voluptatibus possimus eveniet sed expedita!",
      },
      { type: "link", value: "https://google.com.br" },
    ],
    published_at: new Date("2022-06-17 20:00:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.published_at}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
