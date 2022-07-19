import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { GetAllPosts } from "../../services/postService";
import { NewPostModal } from "../../components/NewPostModal";
import { Post } from "../../components/Post";
import { Sidebar } from "../../components/Sidebar";
import { IPost } from "../../interfaces/posts/IPost";

import styles from "./Home.module.css";

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    GetAllPosts().then((resp) => {
      setPosts(resp.data);
    });
  }, []);

  return (
    <div>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <form className={styles.newPost}>
            <button type="button" onClick={handleOpenModal}>
              <Plus />
              Nova publicação
            </button>
            <NewPostModal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
            />
          </form>
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
