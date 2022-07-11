import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { Comment } from "../entities/Comment";

export interface ICommentsRepository {
  list(): Promise<Comment[]>;
  create(data: ICreateCommentDTO): Promise<Comment>;
  delete(comment_id: string): Promise<void>;
  findById(comment_id: string): Promise<Comment | null>;
  findByPostId(post_id: string): Promise<Comment[]>;
}
