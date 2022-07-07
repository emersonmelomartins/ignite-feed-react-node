import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Post } from "../../components/Post";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";

import styles from "./Home.module.css";

interface Post {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  content: [
    {
      id: string;
      post_id: string;
      type: "paragraph" | "link";
      value: string;
    },
  ];
  comments: [
    {
      id: string;
      likes: 1;
      user_id: string;
      post_id: string;
      commentary: string;
      created_at: string;
    }
  ];
  user: {
    name: string;
    role: string;
    avatar: string | null;
  };
}

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/posts").then((resp) => {
      setPosts(resp.data);
    });
  }, []);
  return (
    <div>

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <form className={styles.newPost}>
            <button>
              <Plus />
              Nova publicação</button>
          </form>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.user}
              content={post.content}
              publishedAt={post.created_at}
              comments={post.comments}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
