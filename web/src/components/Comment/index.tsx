import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ThumbsUp, Trash } from "phosphor-react";
import defaultAvatarPng from "../../assets/default-avatar.png";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "../Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
  id: string;
  content: string;
  likes: number;
  created_at: string;
  author: {
    avatar: string | null;
    avatar_url: string;
    name: string;
    role: string;
    email: string;
  };
  onDeleteComment: (comment_id: string) => void;
  onGiveLike: (comment_id: string) => void;
}

export function Comment({
  id,
  content,
  likes,
  created_at,
  author,
  onDeleteComment,
  onGiveLike,
}: CommentProps) {
  const { user } = useAuth();

  const publishedAtToDate = new Date(created_at);

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

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleLikeIncrement() {
    onGiveLike(id);
  }
  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src={author.avatar ? author.avatar_url : defaultAvatarPng}
        alt=""
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title={publishedDateFormatted}
                dateTime={publishedAtToDate.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            {user.email === author.email && (
              <button onClick={handleDeleteComment} title="Deletar comentário">
                <Trash size={20} />
              </button>
            )}
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button type="button" onClick={handleLikeIncrement}>
            <ThumbsUp size={24} />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
