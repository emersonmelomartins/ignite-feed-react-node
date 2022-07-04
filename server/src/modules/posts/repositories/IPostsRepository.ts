import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { Post } from "../entities/Post";

export interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<ICreatePostDTO>;
  findByUser(user_id: string): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
}