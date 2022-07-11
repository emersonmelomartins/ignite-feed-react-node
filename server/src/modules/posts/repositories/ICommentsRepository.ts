import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { Comment } from "../entities/Comment";

export interface ICommentsRepository {
  list(): Promise<Comment[]>;
  findById(comment_id: string): Promise<Comment | null>;
  create(data: ICreateCommentDTO): Promise<Comment>;
  findByPostId(post_id: string): Promise<Comment[]>;
}
