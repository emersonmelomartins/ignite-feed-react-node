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

import styles from "./Post.module.css";

interface PostProps {
  id: string;
  author: Author;
  content: Content[];
  publishedAt: string;
}

interface Content {
  type: "paragraph" | "link";
  value: string;
}

interface Author {
  avatar: string;
  name: string;
  role: string;
}

interface Comment {
  id: string;
  likes: number;
  commentary: string;
}

export function Post({ id, author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    api
      .get("/posts/cbb39370-398c-4fdd-ae58-a356e005f7dd/comments")
      .then((resp) => {
        console.log(resp.data);
        setComments(resp.data);
      });
  }, []);

  // const publishedAtToDate = new Date(publishedAt)

  // const publishedDateFormatted = format(
  //   publishedAtToDate,
  //   "d 'de' LLLL 'às' HH:mm'h'",
  //   {
  //     locale: ptBR,
  //   }
  // );

  // const publishedDateRelativeToNow = formatDistanceToNow(publishedAtToDate, {
  //   locale: ptBR,
  //   addSuffix: true,
  // });

  function handleCreateNewComment(event: FormEvent) {
    // event.preventDefault();

    // setComments([...comments, commentText]);
    // setCommentText("");
  }

  function handleChangeNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setCommentText(event.target.value);
  }

  function deleteComment(currentComment: string) {
    // const updatedComments = comments.filter(
    //   (comment) => comment !== currentComment
    // );
    // setComments(updatedComments);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  const isNewCommentEmpty = commentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatar} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
        // title={publishedDateFormatted}
        // dateTime={publishedAtToDate.toISOString()}
        >
          {/* {publishedDateRelativeToNow} */}
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
          value={commentText}
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
            content={comment.commentary}
            likes={comment.likes}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
