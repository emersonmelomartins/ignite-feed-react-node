import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { api } from "../../services/api";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

import { IComment, IContent } from "../../interfaces/posts/IPost";
import { IUser } from "../../interfaces/users/IUser";

import defaultAvatarPng from "../../assets/default-avatar.png";
import styles from "./Post.module.css";
import {
  CreateComment,
  DeleteComment,
  GetAllCommentsByPost,
  GiveCommentLike,
} from "../../services/commentService";
import { CreatePost } from "../../services/postService";

interface PostProps {
  id: string;
  author: IUser;
  content: IContent[];
  publishedAt: string;
}

export function Post({ id, author, content, publishedAt }: PostProps) {
  const [commentary, setCommentary] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    GetAllCommentsByPost(id).then((resp) => {
      setComments(resp.data);
    });
  }, []);

  const publishedAtToDate = new Date(publishedAt);

  const publishedDateFormatted = format(
    publishedAtToDate,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAtToDate, {
    locale: ptBR,
    addSuffix: true,
  });

  async function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    const { data: newComment } = await CreateComment({
      post_id: id,
      commentary,
    });

    setComments([...comments, newComment]);
    setCommentary("");
  }

  function handleChangeNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setCommentary(event.target.value);
  }

  async function deleteComment(comment_id: string) {
    await DeleteComment(id, comment_id);

    const updatedComments = comments.filter(
      (comment) => comment.id !== comment_id
    );
    setComments(updatedComments);
  }

  async function onGiveLike(comment_id: string) {
    await GiveCommentLike(comment_id);

    const updatedComments = comments.map((comment) => {
      if (comment.id === comment_id) {
        return { ...comment, likes: comment.likes + 1 };
      }

      return comment;
    });

    setComments(updatedComments);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  const isNewCommentEmpty = commentary.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatar ? author.avatar_url : defaultAvatarPng} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAtToDate.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "link") {
            return (
              <p key={line.value}>
                <a href="#">{line.value}</a>
              </p>
            );
          } else {
            return <p key={line.value}>{line.value}</p>;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
          value={commentary}
          onChange={handleChangeNewComment}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id!}
            author={comment.user}
            created_at={comment.created_at}
            content={comment.commentary}
            likes={comment.likes}
            onDeleteComment={deleteComment}
            onGiveLike={onGiveLike}
          />
        ))}
      </div>
    </article>
  );
}
