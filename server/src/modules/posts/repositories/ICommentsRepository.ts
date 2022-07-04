import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { Comment } from "../entities/Comment";

export interface ICommentsRepository {
  findAll(): Promise<Comment[]>;
  create(data: ICreateCommentDTO): Promise<Comment>;
}
