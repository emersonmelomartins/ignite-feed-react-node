import { Comment } from "@modules/posts/entities/Comment";
import { Content } from "@modules/posts/entities/Content";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { UserMap } from "@modules/users/mapper/UserMap";
import { inject, injectable } from "tsyringe";

interface IResponse {
  id: string;
  content: Content[];
  created_at: Date;
  updated_at: Date;
  user: IUserResponseDTO;
  comments: Comment[];
}

@injectable()
export class ListPostsUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute(): Promise<IResponse[]> {
    const posts = await this.postsRepository.list();

    const res: IResponse[] = posts.map((p) => {
      const user = UserMap.toDTO(p.user);
      return {
        ...p,
        user,
      };
    });

    return res;
  }
}
