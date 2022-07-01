import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { Post } from "../entities/Post";

export interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<ICreatePostDTO>;
  findByUser(id: string): Promise<Post[]>;
}