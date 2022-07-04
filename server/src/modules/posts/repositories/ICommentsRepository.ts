import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { Comment } from "../entities/Comment";

export interface ICommentsRepository {
  findAll(): Promise<Comment[]>;
  findById(comment_id: string): Promise<Comment | null>;
  create(data: ICreateCommentDTO): Promise<Comment>;
}
