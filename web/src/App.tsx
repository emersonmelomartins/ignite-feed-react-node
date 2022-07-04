import { Post } from "./components/Post";
import { Header } from "./components/Header";

import styles from "./App.module.css";
import "./global.css";
import { Sidebar } from "./components/Sidebar";
import { useEffect, useState } from "react";
import { api } from "./services/api";

// const posts = [
//   {
//     id: 1,
//     author: {
//       avatar_url: "https://github.com/emersonmelomartins.png",
//       name: "Emerson Melo",
//       role: "Web Developer",
//     },
//     content: [
//       {
//         type: "paragraph",
//         value: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//       },
//       {
//         type: "paragraph",
//         value:
//           "Earum libero ad dolore natus voluptas, nobis deleniti exercitationem at animi ab harum dolores sint repellendus accusantium voluptatibus possimus eveniet sed expedita!",
//       },
//       { type: "link", value: "https://google.com.br" },
//     ],
//     published_at: new Date("2022-06-15 13:07:00"),
//   },
//   {
//     id: 2,
//     author: {
//       avatar_url: "https://github.com/diego3g.png",
//       name: "Diego Fernandes",
//       role: "CTO | Rocketseat",
//     },
//     content: [
//       {
//         type: "paragraph",
//         value: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//       },
//       {
//         type: "paragraph",
//         value:
//           "Earum libero ad dolore natus voluptas, nobis deleniti exercitationem at animi ab harum dolores sint repellendus accusantium voluptatibus possimus eveniet sed expedita!",
//       },
//       { type: "link", value: "https://google.com.br" },
//     ],
//     published_at: new Date("2022-06-17 20:00:00"),
//   },
// ];

interface Post {
  id: "cbb39370-398c-4fdd-ae58-a356e005f7dd";
  user_id: "907c98c0-b278-4fef-a68d-c112d8321163";
  created_at: "2022-07-04T16:08:07.000Z";
  updated_at: "2022-07-04T16:08:07.000Z";
  content: [
    {
      id: "14de1418-39c9-45ce-9c3e-eaa51fc171af";
      post_id: "cbb39370-398c-4fdd-ae58-a356e005f7dd";
      type: "paragraph";
      value: "Lorem ipsum";
    },
    {
      id: "193415df-295c-4995-974e-3406a61bcacd";
      post_id: "cbb39370-398c-4fdd-ae58-a356e005f7dd";
      type: "link";
      value: "https://google.com.br";
    }
  ];
  comments: [
    {
      id: "28d7e86d-7f8d-46a7-9527-a532eb8cd902";
      likes: 1;
      user_id: "907c98c0-b278-4fef-a68d-c112d8321163";
      post_id: "cbb39370-398c-4fdd-ae58-a356e005f7dd";
      commentary: "Cool!";
      created_at: "2022-07-04T16:29:54.000Z";
    }
  ];
  user: {
    name: "Emerson";
    role: "Web Developer";
    avatar: string;
  };
}

export function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/posts/cbb39370-398c-4fdd-ae58-a356e005f7dd").then((resp) => {
      setPosts([resp.data]);
    });
  }, []);
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.user}
              content={post.content}
              publishedAt={post.created_at}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
